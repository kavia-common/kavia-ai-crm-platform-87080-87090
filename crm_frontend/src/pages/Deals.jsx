import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import { formatCurrency } from '../utils/format';

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
  const mock = [
    { id: 1, name: 'Acme Inc. - Expansion', stage: 'poc proposal', amount: 54000, closeDate: '2025-11-01' },
    { id: 2, name: 'Globex - Migration', stage: 'discovery call', amount: 120000, closeDate: '2025-10-12' },
  ];

  return (
    <div className="grid" style={{gap:16}}>
      <Card title="Deals" right={<button className="button primary" onClick={() => setOpen(true)}>+ New Deal</button>}>
        <table className="table">
          <thead>
            <tr>
              <th>Deal</th><th>Stage</th><th>Amount</th><th>Close Date</th><th></th>
            </tr>
          </thead>
          <tbody>
            {mock.map(d => (
              <tr key={d.id}>
                <td>{d.name}</td>
                <td><span className="badge success" style={{ textTransform: 'capitalize' }}>{d.stage}</span></td>
                <td>{formatCurrency(d.amount)}</td>
                <td>{d.closeDate}</td>
                <td><button className="button">Open</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Modal open={open} title="Create Deal" onClose={() => setOpen(false)} footer={
        <>
          <button className="button" onClick={() => setOpen(false)}>Cancel</button>
          <button className="button primary" onClick={() => setOpen(false)}>Create</button>
        </>
      }>
        <div className="grid cols-2">
          <div>
            <div className="helper">Name</div>
            <input className="input" placeholder="Company - Project" />
          </div>
          <div>
            <div className="helper">Stage</div>
            <select className="select" defaultValue={STAGES[0]}>
              {STAGES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <div className="helper">Amount (USD)</div>
            <input className="input" type="number" placeholder="50000" />
          </div>
          <div>
            <div className="helper">Close Date</div>
            <input className="input" type="date" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Deals;
