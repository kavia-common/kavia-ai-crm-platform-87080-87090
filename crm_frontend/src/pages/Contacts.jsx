import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Tabs from '../components/ui/Tabs';
import Modal from '../components/ui/Modal';

const Contacts = () => {
  const [tab, setTab] = useState('all');
  const [open, setOpen] = useState(false);
  const items = [
    { key: 'all', label: 'All' },
    { key: 'leads', label: 'Leads' },
    { key: 'customers', label: 'Customers' },
  ];

  // Updated mock: contacts at Tata Elxsi, ioet, GCS Tech, DigitalT3, MetaZ digital
  // Owners map to current team members seen across Pipeline/SalesTeam (Alex, Jamie, Priya, Sam, Lee, Morgan, Tariq).
  const mock = [
    { id: 1, name: 'Ravi Kumar', email: 'ravi.kumar@tataelxsi.com', status: 'Lead', company: 'Tata Elxsi', owner: 'Alex' },
    { id: 2, name: 'María Pérez', email: 'maria.perez@ioet.com', status: 'Customer', company: 'ioet', owner: 'Jamie' },
    { id: 3, name: 'George Smith', email: 'g.smith@gcstech.com', status: 'Lead', company: 'GCS Tech', owner: 'Priya' },
    { id: 4, name: 'Dinesh Sharma', email: 'dinesh@digitalt3.com', status: 'Lead', company: 'DigitalT3', owner: 'Jamie' },
    { id: 5, name: 'Zara Ali', email: 'z.ali@metaz.digital', status: 'Lead', company: 'MetaZ digital', owner: 'Priya' },
  ];

  return (
    <div className="grid" style={{gap:16}}>
      <Card title="Contacts" right={<button className="button primary" onClick={() => setOpen(true)}>+ Add</button>}>
        <Tabs items={items} activeKey={tab} onChange={setTab} />
        <div style={{marginTop:12}}>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Company</th><th>Owner</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {mock.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.company}</td>
                  <td>{c.owner}</td>
                  <td><span className="badge success">{c.status}</span></td>
                  <td><button className="button">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal open={open} title="New Contact" onClose={() => setOpen(false)} footer={
        <>
          <button className="button" onClick={() => setOpen(false)}>Cancel</button>
          <button className="button primary" onClick={() => setOpen(false)}>Save</button>
        </>
      }>
        <div className="grid cols-2">
          <div>
            <div className="helper">First Name</div>
            <input className="input" placeholder="Alex" />
          </div>
          <div>
            <div className="helper">Last Name</div>
            <input className="input" placeholder="Johnson" />
          </div>
          <div>
            <div className="helper">Email</div>
            <input className="input" placeholder="alex@example.com" type="email" />
          </div>
          <div>
            <div className="helper">Phone</div>
            <input className="input" placeholder="+1 555 0101" />
          </div>
          <div>
            <div className="helper">Status</div>
            <select className="select">
              <option>Lead</option>
              <option>Customer</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Contacts;
