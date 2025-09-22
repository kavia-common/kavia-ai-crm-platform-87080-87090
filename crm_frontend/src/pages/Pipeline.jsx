import React, { useMemo, useState } from 'react';
import Card from '../components/ui/Card';
import { formatCurrency } from '../utils/format';
import { MOCK_DEALS, MOCK_STAGES as stages } from '../services/mockData';

/**
 * Normalize a stage string to our canonical keys.
 */
function normalizeStageName(value) {
  if (!value) return '';
  let s = String(value).trim().toLowerCase();
  s = s.replace(/[_-]+/g, ' ');
  s = s.replace(/\s+/g, ' ');
  s = s.replace(/\b&\b/g, 'and');
  s = s.replace(/\beval(uation)?\b/g, 'evaluation');
  return s;
}

/**
 * PUBLIC_INTERFACE
 * Pipeline view in demo mode: groups local mock deals by stage and allows client-side moving.
 */
const Pipeline = () => {
  // Local state to allow moving deals across columns client-side
  const [deals, setDeals] = useState(
    (Array.isArray(MOCK_DEALS) ? MOCK_DEALS : []).map(d => ({ ...d, stage: normalizeStageName(d.stage) }))
  );

  const byStage = useMemo(() => {
    const base = stages.reduce((acc, s) => ({ ...acc, [s]: [] }), {});
    deals.forEach((d) => {
      const st = normalizeStageName(d.stage);
      if (base[st]) base[st].push({ ...d, stage: st });
    });
    return base;
  }, [deals]);

  const onMove = (id, nextStage) => {
    setDeals(prev => prev.map(d => (d.id === id || d._id === id) ? { ...d, stage: nextStage } : d));
  };

  const totalDeals = deals.length;
  const totalInColumns = stages.reduce((acc, s) => acc + (byStage[s]?.length || 0), 0);

  return (
    <>
      {totalDeals > 0 && totalInColumns === 0 && (
        <Card title="Deals did not map to known stages" subtitle="Check stage normalization">
          <div className="helper">Unexpected stage values in mock data.</div>
        </Card>
      )}

      <div className="pipeline">
        {stages.map((s) => (
          <div key={s} className="pipeline-col">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
              <div style={{fontWeight:700, textTransform: 'capitalize'}}>{s}</div>
              <div className="helper">
                {(byStage[s]?.length || 0)} deals
              </div>
            </div>
            {byStage[s].map((d) => (
              <div key={d.id || d._id} className="deal-card">
                <div style={{fontWeight:700, marginBottom:6}}>{d.name}</div>
                <div className="helper" style={{marginBottom:6}}>Owner: {d.owner || '-'}</div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <div>{formatCurrency(d.amount)}</div>
                  <select
                    className="select"
                    value={d.stage}
                    aria-label="Move deal to stage"
                    title="Move deal to stage"
                    onChange={(e) => onMove(d.id || d._id, e.target.value)}
                  >
                    {stages.map(st => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            {(byStage[s]?.length === 0) && (
              <Card>
                <div className="helper">Drag or move a deal here</div>
              </Card>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Pipeline;
