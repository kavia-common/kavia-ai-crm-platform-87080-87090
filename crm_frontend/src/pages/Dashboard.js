import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { api } from "../services/api";

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    contacts: 0,
    accounts: 0,
    deals: 0,
    pipelineValue: 0,
  });
  const [forecast, setForecast] = useState({ total: 0, byMonth: [] });

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [contacts, accounts, deals, fc] = await Promise.all([
          api.getContacts().catch(() => []),
          api.getAccounts().catch(() => []),
          api.getDeals().catch(() => []),
          api.getForecast().catch(() => ({ total: 0, byMonth: [] })),
        ]);
        if (!mounted) return;
        setStats({
          contacts: contacts?.length || 0,
          accounts: accounts?.length || 0,
          deals: deals?.length || 0,
          pipelineValue: (deals || []).reduce((s, d) => s + (d.amount || 0), 0),
        });
        setForecast(fc || { total: 0, byMonth: [] });
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Dashboard</div>
        <div><Badge>Ocean Professional</Badge></div>
      </div>
      <div className="grid cols-4">
        <Card>
          <div className="stat">
            <div className="icon">👤</div>
            <div>
              <div className="label">Contacts</div>
              <div className="value">{loading ? "—" : stats.contacts}</div>
            </div>
            <div className="delta">+2%</div>
          </div>
        </Card>
        <Card>
          <div className="stat">
            <div className="icon">🏢</div>
            <div>
              <div className="label">Accounts</div>
              <div className="value">{loading ? "—" : stats.accounts}</div>
            </div>
            <div className="delta">+1%</div>
          </div>
        </Card>
        <Card>
          <div className="stat">
            <div className="icon">💼</div>
            <div>
              <div className="label">Deals</div>
              <div className="value">{loading ? "—" : stats.deals}</div>
            </div>
            <div className="delta">+4%</div>
          </div>
        </Card>
        <Card>
          <div className="stat">
            <div className="icon">💰</div>
            <div>
              <div className="label">Pipeline Value</div>
              <div className="value">
                {loading ? "—" : `$${(stats.pipelineValue || 0).toLocaleString()}`}
              </div>
            </div>
            <div className="delta">+3%</div>
          </div>
        </Card>
      </div>

      <div className="grid" style={{ marginTop: 16 }}>
        <Card title="AI Forecast">
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div className="card" style={{ flex: "1 1 280px" }}>
              <div className="label">Total Forecast</div>
              <div className="value" style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>
                {loading ? "—" : `$${(forecast.total || 0).toLocaleString()}`}
              </div>
            </div>
            <div className="card" style={{ flex: "2 1 480px" }}>
              <div className="label">By Month</div>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {(forecast.byMonth || []).map((m) => (
                  <li key={m.month} style={{ margin: "6px 0" }}>
                    <strong>{m.month}:</strong> ${m.value?.toLocaleString?.() || m.value}
                  </li>
                ))}
                {!loading && (!forecast.byMonth || forecast.byMonth.length === 0) && (
                  <li>No forecast data.</li>
                )}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
