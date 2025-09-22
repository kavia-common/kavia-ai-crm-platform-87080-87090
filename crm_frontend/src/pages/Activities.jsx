import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { formatDate } from '../utils/format';
import { MOCK_ACTIVITIES } from '../services/mockData';

/**
 * Demo mode: local mock activities list with client-side add.
 */
const Activities = () => {
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);
  const [form, setForm] = useState({
    type: 'Call',
    when: '',
    subject: '',
    notes: '',
    owner: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const onInput = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const onSave = () => {
    setSubmitting(true);
    const id = `act${Math.random().toString(36).slice(2, 8)}`;
    setActivities(prev => [
      { id, type: form.type, when: form.when || new Date().toISOString().slice(0, 10), subject: form.subject, notes: form.notes || '', owner: form.owner || '' },
      ...prev,
    ]);
    setForm({ type: 'Call', when: '', subject: '', notes: '', owner: '' });
    setSubmitting(false);
  };

  return (
    <div className="grid cols-2">
      <Card title="Log Activity" subtitle="Record calls, meetings, emails">
        <div className="grid cols-2">
          <div>
            <div className="helper">Type</div>
            <select className="select" value={form.type} onChange={(e) => onInput('type', e.target.value)}>
              <option>Call</option>
              <option>Meeting</option>
              <option>Email</option>
              <option>Note</option>
            </select>
          </div>
          <div>
            <div className="helper">Date</div>
            <input className="input" type="date" value={form.when} onChange={(e) => onInput('when', e.target.value)} />
          </div>
          <div className="grid" style={{gridColumn: '1/-1'}}>
            <div className="helper">Subject</div>
            <input className="input" placeholder="Quick follow-up..." value={form.subject} onChange={(e) => onInput('subject', e.target.value)} />
          </div>
          <div className="grid" style={{gridColumn: '1/-1'}}>
            <div className="helper">Notes</div>
            <textarea className="textarea" rows={4} placeholder="Discussion summary..." value={form.notes} onChange={(e) => onInput('notes', e.target.value)} />
          </div>
          <div>
            <div className="helper">Owner</div>
            <input className="input" placeholder="Owner name" value={form.owner} onChange={(e) => onInput('owner', e.target.value)} />
          </div>
          <div style={{gridColumn:'1/-1', display:'flex', gap:10, justifyContent:'flex-end'}}>
            <button className="button" onClick={() => setForm({ type: 'Call', when: '', subject: '', notes: '', owner: '' })} disabled={submitting}>Cancel</button>
            <button className="button primary" onClick={onSave} disabled={submitting}>{submitting ? 'Saving…' : 'Save'}</button>
          </div>
        </div>
      </Card>

      <Card title="Recent Activities">
        <table className="table" role="table" aria-label="Activities table">
          <thead>
            <tr>
              <th>When</th><th>Type</th><th>Subject</th><th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(a => (
              <tr key={a.id || a._id}>
                <td>{formatDate(a.when || a.date)}</td>
                <td>{a.type}</td>
                <td>{a.subject}</td>
                <td>{a.owner || '-'}</td>
              </tr>
            ))}
            {activities.length === 0 && (
              <tr><td colSpan={4} className="helper">No activities yet.</td></tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Activities;
