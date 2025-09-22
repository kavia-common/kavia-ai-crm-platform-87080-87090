import React, { useMemo, useState } from 'react';
import Card from '../components/ui/Card';
import Tabs from '../components/ui/Tabs';
import Modal from '../components/ui/Modal';
import { useAPI } from '../hooks/useAPI';
import { ContactsService } from '../services/contacts';

/**
 * Assumptions:
 * - Backend exposes conventional REST endpoints:
 *   GET/POST /contacts, GET/PUT/DELETE /contacts/:id
 * - Contact object shape may vary; we map to UI fields where possible.
 * - Status field is a simple string like "Lead" | "Customer".
 */
const Contacts = () => {
  const [tab, setTab] = useState('all');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 'Lead',
    company: '',
    owner: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState('');

  const items = [
    { key: 'all', label: 'All' },
    { key: 'leads', label: 'Leads' },
    { key: 'customers', label: 'Customers' },
  ];

  // Load contacts from API
  const { data, error, isLoading, mutate } = useAPI('/contacts');
  const contacts = Array.isArray(data) ? data : (data?.items || []);

  // Filter by tab selection
  const filtered = useMemo(() => {
    if (tab === 'all') return contacts;
    if (tab === 'leads') return contacts.filter(c => (c.status || '').toLowerCase() === 'lead');
    if (tab === 'customers') return contacts.filter(c => (c.status || '').toLowerCase() === 'customer');
    return contacts;
  }, [contacts, tab]);

  const onInput = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const onCreate = async () => {
    setSubmitting(true);
    setActionError('');
    try {
      // Normalize payload for backend – merge first/last into name if backend expects `name`.
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        name: [form.firstName, form.lastName].filter(Boolean).join(' ').trim() || undefined,
        email: form.email,
        phone: form.phone,
        status: form.status,
        company: form.company || undefined,
        owner: form.owner || undefined,
      };
      await ContactsService.create(payload);
      await mutate(); // refresh list
      setOpen(false);
      setForm({ firstName: '', lastName: '', email: '', phone: '', status: 'Lead', company: '', owner: '' });
    } catch (e) {
      setActionError(e?.payload?.message || e.message || 'Failed to create contact');
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm('Delete this contact?')) return;
    setActionError('');
    try {
      await ContactsService.remove(id);
      await mutate();
    } catch (e) {
      setActionError(e?.payload?.message || e.message || 'Failed to delete contact');
    }
  };

  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card
        title="Contacts"
        right={<button className="button primary" onClick={() => setOpen(true)}>+ Add</button>}
      >
        <Tabs items={items} activeKey={tab} onChange={setTab} />
        <div style={{ marginTop: 12 }}>
          {isLoading && <div className="helper">Loading contacts…</div>}
          {error && <div style={{ color: 'var(--color-error)' }}>Error loading contacts: {String(error.message || error)}</div>}
          {actionError && <div style={{ color: 'var(--color-error)', marginBottom: 8 }}>{actionError}</div>}
          {!isLoading && !error && (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th><th>Email</th><th>Company</th><th>Owner</th><th>Status</th><th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const name = c.name || [c.firstName, c.lastName].filter(Boolean).join(' ');
                  return (
                    <tr key={c.id || c._id}>
                      <td>{name || '-'}</td>
                      <td>{c.email || '-'}</td>
                      <td>{c.company || '-'}</td>
                      <td>{c.owner || '-'}</td>
                      <td><span className="badge success">{c.status || '-'}</span></td>
                      <td style={{ display: 'flex', gap: 8 }}>
                        <button className="button">View</button>
                        <button className="button" onClick={() => onDelete(c.id || c._id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="helper">No contacts found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      <Modal
        open={open}
        title="New Contact"
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
          <div>
            <div className="helper">First Name</div>
            <input className="input" placeholder="Alex" value={form.firstName} onChange={(e) => onInput('firstName', e.target.value)} />
          </div>
          <div>
            <div className="helper">Last Name</div>
            <input className="input" placeholder="Johnson" value={form.lastName} onChange={(e) => onInput('lastName', e.target.value)} />
          </div>
          <div>
            <div className="helper">Email</div>
            <input className="input" placeholder="alex@example.com" type="email" value={form.email} onChange={(e) => onInput('email', e.target.value)} />
          </div>
          <div>
            <div className="helper">Phone</div>
            <input className="input" placeholder="+1 555 0101" value={form.phone} onChange={(e) => onInput('phone', e.target.value)} />
          </div>
          <div>
            <div className="helper">Status</div>
            <select className="select" value={form.status} onChange={(e) => onInput('status', e.target.value)}>
              <option>Lead</option>
              <option>Customer</option>
            </select>
          </div>
          <div>
            <div className="helper">Company</div>
            <input className="input" placeholder="Company Inc." value={form.company} onChange={(e) => onInput('company', e.target.value)} />
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

export default Contacts;
