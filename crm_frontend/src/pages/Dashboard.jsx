import React, { useEffect, useState } from 'react';
import api from '../api/client';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  const [stats, setStats] = useState({ contacts: 0, accounts: 0, pipelineValue: 0, openDeals: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        // These endpoints may differ on the backend; use fallbacks when unavailable
        const [contacts, accounts, deals] = await Promise.allSettled([
          api.list('contacts'),
          api.list('accounts'),
          api.list('deals'),
        ]);
        const contactsLen = contacts.value?.length || 0;
        const accountsLen = accounts.value?.length || 0;
        const openDeals = (deals.value || []).filter(d => d.status !== 'Closed Lost' && d.status !== 'Closed Won');
        const pipelineValue = openDeals.reduce((s, d) => s + (Number(d.amount) || 0), 0);
        if (mounted) setStats({ contacts: contactsLen, accounts: accountsLen, openDeals: openDeals.length, pipelineValue });
      } catch (e) {
        // ignore for now
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div style={{ fontWeight: 800 }}>Overview</div>
          <div style={{ color: '#6B7280' }}>{loading ? 'Loading...' : 'Updated'}</div>
        </div>
        <div className="card-body">
          <div className="card-grid">
            <StatCard label="Contacts" value={stats.contacts} />
            <StatCard label="Accounts" value={stats.accounts} accent="secondary" />
            <StatCard label="Open Deals" value={stats.openDeals} />
            <StatCard label="Pipeline Value" value={`$${stats.pipelineValue.toLocaleString()}`} accent="secondary" />
          </div>
        </div>
      </div>

      <div style={{ height: 16 }} />

      <div className="card">
        <div className="card-header">
          <div style={{ fontWeight: 800 }}>Recent Activity</div>
          <button className="btn ghost">View all</button>
        </div>
        <div className="card-body">
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
              🧩 System ready. Connect to backend to see live activity.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
