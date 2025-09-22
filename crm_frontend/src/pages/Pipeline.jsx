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
 * Behavior:
 * - Lowercase
 * - Replace underscores/dashes with spaces
 * - Collapse multiple spaces
 * - Replace & with "and"
 * Notes:
 * - We intentionally do not hard map to canonical list to avoid mutating
 *   unknown stages incorrectly; instead, grouping will ignore unknowns.
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
 * PUBLIC_INTERFACE
 * Pipeline view that groups deals by stage and allows moving a deal to another stage.
 * It fetches deals from /deals via useAPI and tolerates response shapes:
 * - array
 * - or object wrapper with items/results/data arrays.
 * Assumes deal has: id (or _id), name, amount, stage, owner.
 */
const Pipeline = () => {
  const { data, error, isLoading, mutate } = useAPI('/deals');

  // Decide whether to render a small debug panel (enable via ?debugPipeline=1)
  const dbgEnabled = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debugPipeline') === '1';

  // Normalize list shape
  const dealsList = Array.isArray(data) ? data : (data?.items || data?.results || data?.data || []);
  if (dbgEnabled) {
    // Log raw and normalized array length and a sample for inspection
    // Avoid logging huge arrays: slice first 5 for preview
    // eslint-disable-next-line no-console
    console.log('[Pipeline] /deals raw data type:', Array.isArray(data) ? 'array' : typeof data, 'size:', Array.isArray(data) ? data.length : undefined, 'keys:', data && typeof data === 'object' ? Object.keys(data) : undefined);
    // eslint-disable-next-line no-console
    console.log('[Pipeline] normalized dealsList length:', Array.isArray(dealsList) ? dealsList.length : 'non-array');
    // eslint-disable-next-line no-console
    console.log('[Pipeline] dealsList sample:', Array.isArray(dealsList) ? dealsList.slice(0, 5) : dealsList);
  }

  // Normalize stage for each deal without mutating original object
  const deals = useMemo(
    () =>
      (Array.isArray(dealsList) ? dealsList : []).map((d) => {
        const normalized = normalizeStageName(d.stage);
        return { ...d, stage: normalized };
      }),
    [dealsList]
  );

  // Group by stage locally for now
  const byStage = useMemo(() => {
    const base = stages.reduce((acc, s) => ({ ...acc, [s]: [] }), {});
    const stageCounts = {};
    deals.forEach((d) => {
      const st = d.stage;
      stageCounts[st] = (stageCounts[st] || 0) + 1;
      if (base[st]) base[st].push(d);
      // else unknown stage goes to no column; we could show an "Other" column if needed
    });
    if (dbgEnabled) {
      // eslint-disable-next-line no-console
      console.log('[Pipeline] grouped stage counts:', stageCounts);
    }
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

  const totalDeals = Array.isArray(deals) ? deals.length : 0;
  const totalInColumns = stages.reduce((acc, s) => acc + (byStage[s]?.length || 0), 0);

  return (
    <>
      {dbgEnabled && (
        <Card title="Pipeline Debug" subtitle="Live diagnostics for /deals and grouping" style={{ marginBottom: 12 }}>
          <div className="helper" style={{ marginBottom: 8 }}>
            {isLoading ? 'Loading…' : error ? 'Error occurred – check console for details' : 'Loaded'}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div className="card" style={{ padding: 10 }}>
              <div className="helper">Raw data type</div>
              <div>{Array.isArray(data) ? 'array' : typeof data}</div>
            </div>
            <div className="card" style={{ padding: 10 }}>
              <div className="helper">Normalized list length</div>
              <div>{Array.isArray(dealsList) ? dealsList.length : 0}</div>
            </div>
            <div className="card" style={{ padding: 10 }}>
              <div className="helper">Total normalized deals</div>
              <div>{totalDeals}</div>
            </div>
            <div className="card" style={{ padding: 10 }}>
              <div className="helper">Total in shown columns</div>
              <div>{totalInColumns}</div>
            </div>
          </div>
          {Array.isArray(dealsList) && dealsList.length > 0 && (
            <div className="card" style={{ padding: 10, marginTop: 10 }}>
              <div className="helper">Sample item (raw)</div>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(dealsList[0], null, 2)}</pre>
            </div>
          )}
        </Card>
      )}

      {(!isLoading && !error && totalDeals === 0) && (
        <Card title="No deals received" subtitle="The /deals endpoint returned an empty list or non-array wrapper">
          <div className="helper">Verify backend /deals returns an array or an object with items/results/data.</div>
        </Card>
      )}

      {(!isLoading && !error && totalDeals > 0 && totalInColumns === 0) && (
        <Card title="Deals did not map to known stages" subtitle="Stage normalization may not match backend values">
          <div className="helper">Enable ?debugPipeline=1 in URL and check console for normalized stage strings.</div>
        </Card>
      )}

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
    </>
  );
};

export default Pipeline;
