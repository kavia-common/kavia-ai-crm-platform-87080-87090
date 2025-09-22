import React, { useMemo } from 'react';
import Card from '../components/ui/Card';
import { formatCurrency } from '../utils/format';
import { useAPI } from '../hooks/useAPI';
import { DealsService } from '../services/deals';

// Use the exact stages and order specified
const stages = [
  'prospecting',
  'qualification',
  'discovery call',
  'demo',
  'poc proposal',
  'poc execution',
  'evaluation and feedback',
  'negotiation and contracting',
  'closed won',
  'closed lost',
];

/**
 * Pipeline now fetches deals from backend /deals but keeps same UI structure.
 * Assumes each deal has fields: id, name, amount, stage, owner.
 */
const Pipeline = () => {
  const { data, error, isLoading, mutate } = useAPI('/deals');
  const deals = Array.isArray(data) ? data : (data?.items || []);

  // Group by stage locally for now
  const byStage = useMemo(() => {
    const base = stages.reduce((acc, s) => ({ ...acc, [s]: [] }), {});
    deals.forEach(d => {
      if (base[d.stage]) base[d.stage].push(d);
    });
    return base;
  }, [deals]);

  const onMove = async (id, nextStage) => {
    try {
      await DealsService.move(id, nextStage);
      await mutate();
    } catch (e) {
      // Lightweight error notif – keep UI simple
      alert(`Failed to move deal: ${e?.payload?.message || e.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="pipeline">
      {stages.map((s) => (
        <div key={s} className="pipeline-col">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
            <div style={{fontWeight:700, textTransform: 'capitalize'}}>{s}</div>
            <div className="helper">
              {isLoading ? '…' : (byStage[s]?.length || 0)} deals
              {error && <span style={{ color:'var(--color-error)', marginLeft: 6 }}>Load error</span>}
            </div>
          </div>
          {!isLoading && !error && byStage[s].map((d) => (
            <div key={d.id || d._id} className="deal-card">
              <div style={{fontWeight:700, marginBottom:6}}>{d.name}</div>
              <div className="helper" style={{marginBottom:6}}>Owner: {d.owner || '-'}</div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>{formatCurrency(d.amount)}</div>
                <select
                  className="select"
                  value={d.stage}
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
          {!isLoading && !error && (byStage[s]?.length === 0) && (
            <Card>
              <div className="helper">Drag or move a deal here</div>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};

export default Pipeline;
