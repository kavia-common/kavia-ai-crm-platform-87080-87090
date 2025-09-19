import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { api } from "../services/api";

export function Activities() {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: "Note", subject: "", description: "" });

  useEffect(() => {
    api.getActivities().then((d) => setList(d || [])).catch(() => setList([]));
  }, []);

  const submit = async () => {
    try {
      const created = await api.createActivity(form);
      setList((prev) => [created, ...prev]);
      setOpen(false);
      setForm({ type: "Note", subject: "", description: "" });
    } catch { /* ignore */ }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Activities</div>
        <button className="btn" onClick={() => setOpen(true)}>Log Activity</button>
      </div>
      <Card>
        <table className="table">
          <thead>
            <tr><th>Type</th><th>Subject</th><th>Description</th><th>Date</th></tr>
          </thead>
          <tbody>
            {list.length === 0 && <tr><td colSpan={4}>No activities logged.</td></tr>}
            {list.map((a, idx) => (
              <tr key={a.id || idx}>
                <td>{a.type}</td>
                <td>{a.subject}</td>
                <td>{a.description}</td>
                <td>{a.createdAt ? new Date(a.createdAt).toLocaleString() : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal open={open} title="Log Activity" onClose={() => setOpen(false)} actions={<button className="btn" onClick={submit}>Save</button>}>
        <div className="form-grid">
          <div>
            <label className="label">Type</label>
            <select className="select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option>Note</option>
              <option>Call</option>
              <option>Email</option>
              <option>Meeting</option>
            </select>
          </div>
          <div>
            <label className="label">Subject</label>
            <input className="input" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          </div>
          <div className="full">
            <label className="label">Description</label>
            <textarea className="textarea" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
