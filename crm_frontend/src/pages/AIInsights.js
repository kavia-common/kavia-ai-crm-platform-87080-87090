import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Tabs } from "../components/Tabs";
import { Badge } from "../components/Badge";
import { api } from "../services/api";

export function AIInsights() {
  const [active, setActive] = useState("lead");
  const [leadScores, setLeadScores] = useState([]);
  const [forecast, setForecast] = useState({ total: 0, byMonth: [] });
  const [probability, setProbability] = useState({});

  useEffect(() => {
    api.getLeadScoring().then((d) => setLeadScores(d || [])).catch(() => setLeadScores([]));
    api.getForecast().then((d) => setForecast(d || { total: 0, byMonth: [] })).catch(() => setForecast({ total: 0, byMonth: [] }));
  }, []);

  const checkProbability = async (dealId) => {
    const data = await api.getProbability(dealId).catch(() => ({}));
    setProbability((prev) => ({ ...prev, [dealId]: data }));
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">AI Insights</div>
      </div>
      <Tabs
        tabs={[
          { key: "lead", label: "Lead Scoring" },
          { key: "forecast", label: "Forecast" },
          { key: "winprob", label: "Win Probability" },
        ]}
        active={active}
        onChange={setActive}
      />

      {active === "lead" && (
        <Card title="Lead Scoring">
          <table className="table">
            <thead><tr><th>Lead</th><th>Score</th><th>Tier</th></tr></thead>
            <tbody>
              {leadScores.length === 0 && <tr><td colSpan={3}>No lead scores available.</td></tr>}
              {leadScores.map((l) => (
                <tr key={l.id || l.email}>
                  <td>{l.name || l.email}</td>
                  <td>{l.score}</td>
                  <td><Badge color={l.score >= 80 ? "green" : "amber"}>{l.score >= 80 ? "A" : l.score >= 60 ? "B" : "C"}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {active === "forecast" && (
        <Card title="Forecast Overview">
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div className="card" style={{ flex: "1 1 280px" }}>
              <div className="label">Total Forecast</div>
              <div className="value" style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>
                ${Number(forecast.total || 0).toLocaleString()}
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
                {(!forecast.byMonth || forecast.byMonth.length === 0) && <li>No forecast entries.</li>}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {active === "winprob" && (
        <Card title="Win Probability">
          <div className="label">Enter a Deal ID to check probability:</div>
          <div style={{ display: "flex", gap: 8, margin: "8px 0 12px" }}>
            <input id="dealIdInput" className="input" placeholder="Deal ID" style={{ width: 260 }} />
            <button
              className="btn"
              onClick={() => {
                const id = document.getElementById("dealIdInput").value;
                if (id) checkProbability(id);
              }}
            >
              Check
            </button>
          </div>
          <div>
            {Object.entries(probability).map(([id, p]) => (
              <div key={id} className="card" style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 700 }}>Deal {id}</div>
                <div className="label">Win Probability</div>
                <div className="value" style={{ fontSize: 22, fontWeight: 800 }}>{Math.round((p.probability || 0) * 100)}%</div>
              </div>
            ))}
            {Object.keys(probability).length === 0 && <div>No checks yet.</div>}
          </div>
        </Card>
      )}
    </div>
  );
}
