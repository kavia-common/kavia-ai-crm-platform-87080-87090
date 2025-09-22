import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import { MOCK_ACCOUNTS } from '../services/mockData';

/**
 * Demo mode: Uses local mock accounts, no backend calls.
 */
const Accounts = () => {
  const [accounts, setAccounts] = useState(MOCK_ACCOUNTS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', domain: '', owner: '' });
  const [submitting, setSubmitting] = useState(false);

  const onInput = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const onCreate = () => {
    setSubmitting(true);
    // simple local append with generated id
    const id = `a${Math.random().toString(36).slice(2, 8)}`;
    setAccounts(prev => [{ id, name: form.name, domain: form.domain || '', owner: form.owner || '' }, ...prev]);
    setOpen(false);
    setForm({ name: '', domain: '', owner: '' });
    setSubmitting(false);
  };

  const onDelete = (id) => {
    if (!window.confirm('Delete this account?')) return;
    setAccounts(prev => prev.filter(a => (a.id || a._id) !== id));
  };

  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card
        title="Accounts"
        right={<button className="button primary" onClick={() => setOpen(true)}>+ New Account</button>}
      >
        <table className="table" role="table" aria-label="Accounts table">
          <thead>
            <tr>
              <th>Name</th><th>Domain</th><th>Owner</th><th></th>
            </tr>
          </thead>
          <tbody>
            {accounts.map(a => (
              <tr key={a.id || a._id}>
                <td>{a.name || '-'}</td>
                <td>{a.domain || '-'}</td>
                <td>{a.owner || '-'}</td>
                <td style={{ display: 'flex', gap: 8 }}>
                  <button className="button" title="Open account">Open</button>
                  <button className="button" title="Delete account" onClick={() => onDelete(a.id || a._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {accounts.length === 0 && (
              <tr><td colSpan={4} className="helper">No accounts found.</td></tr>
            )}
          </tbody>
        </table>
      </Card>

      <Modal
        open={open}
        title="New Account"
        onClose={() => setOpen(false)}
        footer={
          <>
            <button className="button" onClick={() => setOpen(false)} disabled={submitting}>Cancel</button>
            <button className="button primary" onClick={onCreate} disabled={submitting}>
              {submitting ? 'Saving…' : 'Save'}
            </button>
          </>
        }
      >
        <div className="grid cols-2">
          <div style={{ gridColumn: '1/-1' }}>
            <div className="helper">Name</div>
            <input className="input" placeholder="Acme Inc." value={form.name} onChange={(e) => onInput('name', e.target.value)} />
          </div>
          <div>
            <div className="helper">Domain</div>
            <input className="input" placeholder="acme.com" value={form.domain} onChange={(e) => onInput('domain', e.target.value)} />
          </div>
          <div>
            <div className="helper">Owner</div>
            <input className="input" placeholder="Owner name" value={form.owner} onChange={(e) => onInput('owner', e.target.value)} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Accounts;
