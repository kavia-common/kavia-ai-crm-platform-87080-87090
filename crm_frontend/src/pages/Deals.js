import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { Badge } from "../components/Badge";
import { api } from "../services/api";

export function Deals() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", amount: "", stage: "Qualification", accountId: "" });

  useEffect(() => {
    api.getDeals().then((d) => setList(d || [])).catch(() => setList([]));
  }, []);

  const submit = async () => {
    try {
      const payload = { ...form, amount: Number(form.amount || 0) };
      const created = await api.createDeal(payload);
      setList((prev) => [created, ...prev]);
      setOpen(false);
      setForm({ name: "", amount: "", stage: "Qualification", accountId: "" });
    } catch { /* ignore */ }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Deals</div>
        <button className="btn" onClick={() => setOpen(true)}>New Deal</button>
      </div>
      <Card>
        <table className="table">
          <thead>
            <tr>
              <th>Deal</th><th>Stage</th><th>Amount</th><th>Account</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr><td colSpan={4}>No deals found.</td></tr>
            )}
            {list.map((d) => (
              <tr key={d.id || d.name}>
                <td>{d.name}</td>
                <td><Badge color="amber">{d.stage || "—"}</Badge></td>
                <td>{typeof d.amount === "number" ? `$${d.amount.toLocaleString()}` : "—"}</td>
                <td>{d.accountName || d.accountId || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal open={open} title="Create Deal" onClose={() => setOpen(false)} actions={<button className="btn" onClick={submit}>Save</button>}>
        <div className="form-grid">
          <div className="full">
            <label className="label">Deal Name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label">Amount</label>
            <input className="input" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          </div>
          <div>
            <label className="label">Stage</label>
            <select className="select" value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })}>
              <option>Qualification</option>
              <option>Discovery</option>
              <option>Proposal</option>
              <option>Negotiation</option>
              <option>Closed Won</option>
              <option>Closed Lost</option>
            </select>
          </div>
          <div className="full">
            <label className="label">Account ID</label>
            <input className="input" value={form.accountId} onChange={(e) => setForm({ ...form, accountId: e.target.value })} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
