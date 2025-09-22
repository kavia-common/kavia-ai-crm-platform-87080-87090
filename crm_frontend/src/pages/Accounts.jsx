import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import { useAPI } from '../hooks/useAPI';
import { AccountsService } from '../services/accounts';

/**
 * Assumptions:
 * - Backend exposes GET/POST /accounts and GET/PUT/DELETE /accounts/:id.
 * - Account fields used: name, domain, owner. Open deals count not provided -> omitted to avoid incorrect assumptions.
 */
const Accounts = () => {
  const { data, error, isLoading, mutate } = useAPI('/accounts');
  const accounts = Array.isArray(data) ? data : (data?.items || []);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', domain: '', owner: '' });
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState('');

  const onInput = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const onCreate = async () => {
    setSubmitting(true);
    setActionError('');
    try {
      await AccountsService.create({
        name: form.name,
        domain: form.domain || undefined,
        owner: form.owner || undefined,
      });
      await mutate();
      setOpen(false);
      setForm({ name: '', domain: '', owner: '' });
    } catch (e) {
      setActionError(e?.payload?.message || e.message || 'Failed to create account');
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this account?')) return;
    setActionError('');
    try {
      await AccountsService.remove(id);
      await mutate();
    } catch (e) {
      setActionError(e?.payload?.message || e.message || 'Failed to delete account');
    }
  };

  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card
        title="Accounts"
        right={<button className="button primary" onClick={() => setOpen(true)}>+ New Account</button>}
      >
        {isLoading && <div className="helper">Loading accounts…</div>}
        {error && <div style={{ color: 'var(--color-error)' }}>Error loading accounts: {String(error.message || error)}</div>}
        {actionError && <div style={{ color: 'var(--color-error)', marginBottom: 8 }}>{actionError}</div>}
        {!isLoading && !error && (
          <table className="table">
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
                    <button className="button">Open</button>
                    <button className="button" onClick={() => onDelete(a.id || a._id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {accounts.length === 0 && (
                <tr><td colSpan={4} className="helper">No accounts found.</td></tr>
              )}
            </tbody>
          </table>
        )}
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
