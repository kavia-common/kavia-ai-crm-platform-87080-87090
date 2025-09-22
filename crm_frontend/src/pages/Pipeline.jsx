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
 * Normalize a backend stage string to match our canonical column keys.
 * - Lowercase
 * - Replace underscores/dashes with space
 * - Collapse double spaces
 * - Map known variants (e.g., "negotiation & contracting" -> "negotiation and contracting")
 */
function normalizeStageName(value) {
  if (!value) return '';
  let s = String(value).trim().toLowerCase();
  s = s.replace(/[_-]+/g, ' ');
  s = s.replace(/\s+/g, ' ');
  // common synonyms/variants
  s = s.replace(/\b&\b/g, 'and');
  s = s.replace(/\beval(uation)?\b/g, 'evaluation');
  s = s.replace(/\bfeedback\b/g, 'feedback');
  // return as-is; grouping will ignore unknowns
  return s;
}

/**
 * Pipeline now fetches deals from backend /deals but keeps same UI structure.
 * Assumes each deal has fields: id (or _id), name, amount, stage, owner.
 * Tolerates backend response shapes: array or { items/results/data }.
 */
const Pipeline = () => {
  const { data, error, isLoading, mutate } = useAPI('/deals');
  const dealsList = Array.isArray(data) ? data : (data?.items || data?.results || data?.data || []);
  // Normalize stage for each deal without mutating original object
  const deals = useMemo(
    () =>
      dealsList.map((d) => ({
        ...d,
        stage: normalizeStageName(d.stage),
      })),
    [dealsList]
  );

  // Group by stage locally for now
  const byStage = useMemo(() => {
    const base = stages.reduce((acc, s) => ({ ...acc, [s]: [] }), {});
    deals.forEach((d) => {
      const st = d.stage;
      if (base[st]) base[st].push(d);
      // else unknown stage goes to no column; we could show an "Other" column if needed
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
