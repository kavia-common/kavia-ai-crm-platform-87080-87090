import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import { formatCurrency } from '../utils/format';
import { MOCK_DEALS } from '../services/mockData';

// Keep a single source of truth for stages matching Pipeline
const STAGES = [
  'prospecting',
  'qualification',
  'discovery call',
  'demo',
  'poc proposal',
  'poc execution',
  'evaluation and feedback',
  'negotiation and contracting',
  'closed won',
  'closed lost',
];

const Deals = () => {
  const [open, setOpen] = useState(false);
  const [deals, setDeals] = useState(MOCK_DEALS);
  const [form, setForm] = useState({ name: '', stage: STAGES[0], amount: '', closeDate: '' });
  const [submitting, setSubmitting] = useState(false);

  const onInput = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const onCreate = () => {
    setSubmitting(true);
    const id = `d${Math.random().toString(36).slice(2, 8)}`;
    setDeals(prev => [
      { id, name: form.name, stage: form.stage, amount: Number(form.amount) || 0, closeDate: form.closeDate || '' },
      ...prev,
    ]);
    setOpen(false);
    setForm({ name: '', stage: STAGES[0], amount: '', closeDate: '' });
    setSubmitting(false);
  };

  const onDelete = (id) => {
    if (!window.confirm('Delete this deal?')) return;
    setDeals(prev => prev.filter(d => (d.id || d._id) !== id));
  };

  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card title="Deals" right={<button className="button primary" onClick={() => setOpen(true)}>+ New Deal</button>}>
        <table className="table">
          <thead>
            <tr>
              <th>Deal</th><th>Stage</th><th>Amount</th><th>Close Date</th><th></th>
            </tr>
          </thead>
          <tbody>
            {deals.map(d => (
              <tr key={d.id || d._id}>
                <td>{d.name || '-'}</td>
                <td><span className="badge success" style={{ textTransform: 'capitalize' }}>{d.stage || '-'}</span></td>
                <td>{formatCurrency(d.amount)}</td>
                <td>{d.closeDate || '-'}</td>
                <td style={{ display: 'flex', gap: 8 }}>
                  <button className="button">Open</button>
                  <button className="button" onClick={() => onDelete(d.id || d._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {deals.length === 0 && (
              <tr><td colSpan={5} className="helper">No deals found.</td></tr>
            )}
          </tbody>
        </table>
      </Card>

      <Modal open={open} title="Create Deal" onClose={() => setOpen(false)} footer={
        <>
          <button className="button" onClick={() => setOpen(false)} disabled={submitting}>Cancel</button>
          <button className="button primary" onClick={onCreate} disabled={submitting}>
            {submitting ? 'Creating…' : 'Create'}
          </button>
        </>
      }>
        <div className="grid cols-2">
          <div>
            <div className="helper">Name</div>
            <input className="input" placeholder="Company - Project" value={form.name} onChange={(e) => onInput('name', e.target.value)} />
          </div>
          <div>
            <div className="helper">Stage</div>
            <select className="select" value={form.stage} onChange={(e) => onInput('stage', e.target.value)}>
              {STAGES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="helper">Amount (USD)</div>
            <input className="input" type="number" placeholder="50000" value={form.amount} onChange={(e) => onInput('amount', e.target.value)} />
          </div>
          <div>
            <div className="helper">Close Date</div>
            <input className="input" type="date" value={form.closeDate} onChange={(e) => onInput('closeDate', e.target.value)} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Deals;
