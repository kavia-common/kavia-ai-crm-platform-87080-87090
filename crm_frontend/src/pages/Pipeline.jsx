import React, { useEffect, useState } from 'react';
import api from '../api/client';

const STAGES = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

export default function Pipeline() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.list('deals');
        if (mounted) setDeals(Array.isArray(data) ? data : (data?.items || []));
      } catch (e) {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, []);

  const moveDeal = async (deal, stage) => {
    setDeals(prev => prev.map(d => d.id === deal.id ? { ...d, stage } : d));
    try {
      await api.update('deals', deal.id, { ...deal, stage });
    } catch (e) {
      // revert on fail optionally
    }
  };

  const onDragStart = (e, deal) => {
    e.dataTransfer.setData('application/json', JSON.stringify(deal));
  };
  const onDrop = (e, stage) => {
    const deal = JSON.parse(e.dataTransfer.getData('application/json'));
    moveDeal(deal, stage);
  };

  return (
    <div className="card">
      <div className="card-header"><div style={{ fontWeight: 800 }}>Pipeline</div></div>
      <div className="card-body">
        <div className="pipeline">
          {STAGES.slice(0, 4).map(stage => (
            <div key={stage} className="stage" onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>onDrop(e, stage)}>
              <div className="stage-title">{stage}</div>
              {deals.filter(d => d.stage === stage).map(d => (
                <div key={d.id} className="deal-card" draggable onDragStart={(e)=>onDragStart(e, d)}>
                  <div style={{ fontWeight: 700 }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{d.account_name || '—'}</div>
                  <div style={{ marginTop: 6, color: 'var(--color-secondary)', fontWeight: 700 }}>${Number(d.amount || 0).toLocaleString()}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, color: '#6B7280' }}>
          Drag deals between stages. Changes are saved automatically.
        </div>
      </div>
    </div>
  );
}
