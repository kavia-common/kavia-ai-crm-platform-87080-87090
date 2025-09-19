import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { api } from "../services/api";

export function Accounts() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", industry: "", website: "" });

  useEffect(() => {
    api.getAccounts().then((d) => setList(d || [])).catch(() => setList([]));
  }, []);

  const submit = async () => {
    try {
      const created = await api.createAccount(form);
      setList((prev) => [created, ...prev]);
      setOpen(false);
      setForm({ name: "", industry: "", website: "" });
    } catch (e) { /* ignore */ }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Accounts</div>
        <button className="btn" onClick={() => setOpen(true)}>New Account</button>
      </div>
      <Card>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th><th>Industry</th><th>Website</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr><td colSpan={3}>No accounts found.</td></tr>
            )}
            {list.map((a) => (
              <tr key={a.id || a.name}>
                <td>{a.name}</td>
                <td>{a.industry || "—"}</td>
                <td>{a.website ? <a href={a.website} target="_blank" rel="noreferrer">{a.website}</a> : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal open={open} title="Create Account" onClose={() => setOpen(false)} actions={<button className="btn" onClick={submit}>Save</button>}>
        <div className="form-grid">
          <div className="full">
            <label className="label">Name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label">Industry</label>
            <input className="input" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} />
          </div>
          <div>
            <label className="label">Website</label>
            <input className="input" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
