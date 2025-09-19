import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { api } from "../services/api";

export function Contacts() {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((c) =>
      [c.firstName, c.lastName, c.email, c.phone].some((v) => String(v || "").toLowerCase().includes(q))
    );
  }, [query, list]);

  useEffect(() => {
    setLoading(true);
    api.getContacts()
      .then((data) => setList(data || []))
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, []);

  const submit = async () => {
    try {
      const created = await api.createContact(form);
      setList((prev) => [created, ...prev]);
      setOpen(false);
      setForm({ firstName: "", lastName: "", email: "", phone: "" });
    } catch (e) {
      // noop for now
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Contacts</div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="input"
            placeholder="Search contacts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: 240 }}
          />
          <button className="btn" onClick={() => setOpen(true)}>New Contact</button>
        </div>
      </div>

      <Card>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Account</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={4}>Loading...</td></tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={4}>No contacts found.</td></tr>
            )}
            {filtered.map((c) => (
              <tr key={c.id || `${c.email}-${c.phone}`}>
                <td>{c.firstName} {c.lastName}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.accountName || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal open={open} title="Create Contact" onClose={() => setOpen(false)} actions={
        <button className="btn" onClick={submit}>Save</button>
      }>
        <div className="form-grid">
          <div>
            <label className="label">First Name</label>
            <input className="input" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
          </div>
          <div>
            <label className="label">Last Name</label>
            <input className="input" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
          </div>
          <div className="full">
            <label className="label">Email</label>
            <input className="input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="full">
            <label className="label">Phone</label>
            <input className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
