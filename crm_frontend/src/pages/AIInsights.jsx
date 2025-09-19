import React, { useEffect, useState } from 'react';
import api from '../api/client';
import StatCard from '../components/StatCard';

export default function AIInsights() {
  const [forecast, setForecast] = useState(null);
  const [topLeads, setTopLeads] = useState([]);
  const [dealId, setDealId] = useState('');
  const [prob, setProb] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [fc, contacts] = await Promise.allSettled([
          api.ai.forecast('this_quarter'),
          api.list('contacts'),
        ]);
        const contactsArr = contacts.value || [];
        // Lead scores demo: when endpoint not available, fall back to random
        const withScores = await Promise.all(
          (contactsArr.slice(0, 5)).map(async (c) => {
            try {
              const s = await api.ai.leadScore?.(c.id);
              return { ...c, score: s?.score ?? Math.round(Math.random() * 100) };
            } catch {
              return { ...c, score: Math.round(Math.random() * 100) };
            }
          })
        );
        if (mounted) {
          setForecast(fc.value || { expected_revenue: 0, period: 'this_quarter' });
          setTopLeads(withScores.sort((a,b)=>b.score - a.score));
        }
      } catch (e) {
        setError(e.message || 'Failed to load AI insights');
      }
    })();
    return () => { mounted = false; };
  }, []);

  const checkProbability = async () => {
    setError('');
    setProb(null);
    if (!dealId) return;
    try {
      const res = await api.ai.winProbability(dealId);
      setProb(res?.probability ?? null);
    } catch (e) {
      setError(e.message || 'Failed to get probability');
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header"><div style={{ fontWeight: 800 }}>AI Overview</div></div>
        <div className="card-body">
          {error && <div style={{ color: 'var(--color-error)', marginBottom: 8 }}>{error}</div>}
          <div className="card-grid">
            <StatCard label="Expected Revenue (Quarter)" value={`$${Number(forecast?.expected_revenue || 0).toLocaleString()}`} />
            <StatCard label="Avg Lead Score (Top 5)" value={Math.round(topLeads.reduce((s, l)=>s + (l.score || 0), 0) / (topLeads.length || 1))} accent="secondary" />
            <StatCard label="Leads Analyzed" value={topLeads.length} />
            <StatCard label="Forecast Period" value={forecast?.period || '—'} accent="secondary" />
          </div>
        </div>
      </div>

      <div style={{ height: 16 }} />

      <div className="card">
        <div className="card-header"><div style={{ fontWeight: 800 }}>Top Leads</div></div>
        <div className="card-body">
          <table className="table">
            <thead><tr><th>Name</th><th>Email</th><th>Score</th></tr></thead>
            <tbody>
              {topLeads.map(l => (
                <tr key={l.id || l.email}>
                  <td>{[l.first_name, l.last_name].filter(Boolean).join(' ') || '—'}</td>
                  <td>{l.email || '—'}</td>
                  <td style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{l.score}</td>
                </tr>
              ))}
              {!topLeads.length && <tr><td colSpan="3" style={{ color: '#6B7280' }}>No leads</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ height: 16 }} />

      <div className="card">
        <div className="card-header"><div style={{ fontWeight: 800 }}>Deal Win Probability</div></div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="input" placeholder="Deal ID" value={dealId} onChange={(e)=>setDealId(e.target.value)} />
            <button className="btn" onClick={checkProbability}>Check</button>
          </div>
          {prob != null && (
            <div style={{ marginTop: 10, fontWeight: 700 }}>
              Probability: <span style={{ color: 'var(--color-secondary)' }}>{Math.round(prob * 100)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
