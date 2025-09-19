import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { api } from "../services/api";

const STAGES = ["Qualification", "Discovery", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];

export function Pipeline() {
  const [columns, setColumns] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getPipeline();
        const byStage = {};
        STAGES.forEach((s) => (byStage[s] = []));
        (data || []).forEach((d) => {
          const stage = d.stage && STAGES.includes(d.stage) ? d.stage : STAGES[0];
          byStage[stage].push(d);
        });
        setColumns(byStage);
      } catch {
        // fallback: empty
        const empty = {}; STAGES.forEach((s) => (empty[s] = [])); setColumns(empty);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const move = async (dealId, toStage) => {
    try {
      await api.moveDeal(dealId, toStage);
      setColumns((prev) => {
        const next = {};
        STAGES.forEach((s) => (next[s] = [...(prev[s] || [])]));
        let moved;
        STAGES.forEach((s) => {
          next[s] = next[s].filter((d) => {
            if (d.id === dealId) { moved = d; return false; }
            return true;
          });
        });
        if (moved) { moved.stage = toStage; next[toStage].unshift(moved); }
        return next;
      });
    } catch {
      // ignore for now
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Pipeline</div>
      </div>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: `repeat(${STAGES.length}, minmax(220px, 1fr))`, overflowX: "auto" }}>
        {STAGES.map((stage) => (
          <Card key={stage} title={stage}>
            {loading && <div>Loading...</div>}
            {!loading && (columns[stage] || []).length === 0 && <div>No deals</div>}
            {(columns[stage] || []).map((d) => (
              <div key={d.id || d.name} className="card" style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 700 }}>{d.name}</div>
                <div style={{ fontSize: 12, color: "#6B7280" }}>${(d.amount || 0).toLocaleString()}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                  {STAGES.filter((s) => s !== stage).slice(0, 3).map((s) => (
                    <button key={s} className="btn secondary" onClick={() => move(d.id, s)}>{s}</button>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}
