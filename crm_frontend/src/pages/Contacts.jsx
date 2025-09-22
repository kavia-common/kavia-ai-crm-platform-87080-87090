import React, { useMemo, useState } from 'react';
import Card from '../components/ui/Card';
import Tabs from '../components/ui/Tabs';
import Modal from '../components/ui/Modal';
import { MOCK_CONTACTS } from '../services/mockData';

/**
 * Demo mode: contacts list from local mock data; add/delete are client-side only.
 */
const Contacts = () => {
  const [tab, setTab] = useState('all');
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState(MOCK_CONTACTS);
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

  const items = [
    { key: 'all', label: 'All' },
    { key: 'leads', label: 'Leads' },
    { key: 'customers', label: 'Customers' },
  ];

  // Filter by tab selection
  const filtered = useMemo(() => {
    if (tab === 'all') return contacts;
    if (tab === 'leads') return contacts.filter(c => (c.status || '').toLowerCase() === 'lead');
    if (tab === 'customers') return contacts.filter(c => (c.status || '').toLowerCase() === 'customer');
    return contacts;
  }, [contacts, tab]);

  const onInput = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const onCreate = () => {
    setSubmitting(true);
    const id = `c${Math.random().toString(36).slice(2, 8)}`;
    const name = [form.firstName, form.lastName].filter(Boolean).join(' ').trim();
    setContacts(prev => [
      {
        id,
        firstName: form.firstName,
        lastName: form.lastName,
        name: name || undefined,
        email: form.email,
        phone: form.phone,
        status: form.status,
        company: form.company || '',
        owner: form.owner || '',
      },
      ...prev,
    ]);
    setOpen(false);
    setForm({ firstName: '', lastName: '', email: '', phone: '', status: 'Lead', company: '', owner: '' });
    setSubmitting(false);
  };

  const onDelete = (id) => {
    if (!window.confirm('Delete this contact?')) return;
    setContacts(prev => prev.filter(c => (c.id || c._id) !== id));
  };

  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card
        title="Contacts"
        right={<button className="button primary" onClick={() => setOpen(true)}>+ Add</button>}
      >
        <Tabs items={items} activeKey={tab} onChange={setTab} />
        <div style={{ marginTop: 12 }}>
          <table className="table" role="table" aria-label="Contacts table">
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
                      <button className="button" title="Open contact details">View</button>
                      <button className="button" title="Delete contact" onClick={() => onDelete(c.id || c._id)}>Delete</button>
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
