import React from 'react';
import Card from '../components/ui/Card';
import { formatDate } from '../utils/format';

const Activities = () => {
  const mock = [
    { id: 1, type: 'Call', subject: 'Follow up with Acme', when: '2025-09-15', owner: 'Alex' },
    { id: 2, type: 'Email', subject: 'Send proposal to Globex', when: '2025-09-16', owner: 'Jamie' },
  ];

  return (
    <div className="grid cols-2">
      <Card title="Log Activity" subtitle="Record calls, meetings, emails">
        <div className="grid cols-2">
          <div>
            <div className="helper">Type</div>
            <select className="select">
              <option>Call</option>
              <option>Meeting</option>
              <option>Email</option>
              <option>Note</option>
            </select>
          </div>
          <div>
            <div className="helper">Date</div>
            <input className="input" type="date" />
          </div>
          <div className="grid" style={{gridColumn: '1/-1'}}>
            <div className="helper">Subject</div>
            <input className="input" placeholder="Quick follow-up..." />
          </div>
          <div className="grid" style={{gridColumn: '1/-1'}}>
            <div className="helper">Notes</div>
            <textarea className="textarea" rows={4} placeholder="Discussion summary..." />
          </div>
          <div style={{gridColumn:'1/-1', display:'flex', gap:10, justifyContent:'flex-end'}}>
            <button className="button">Cancel</button>
            <button className="button primary">Save</button>
          </div>
        </div>
      </Card>

      <Card title="Recent Activities">
        <table className="table">
          <thead>
            <tr>
              <th>When</th><th>Type</th><th>Subject</th><th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {mock.map(a => (
              <tr key={a.id}>
                <td>{formatDate(a.when)}</td>
                <td>{a.type}</td>
                <td>{a.subject}</td>
                <td>{a.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Activities;
