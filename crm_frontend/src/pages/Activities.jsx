import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { formatDate } from '../utils/format';
import { useAPI } from '../hooks/useAPI';
import { ActivitiesService } from '../services/activities';

/**
 * Assumptions:
 * - Backend endpoints: GET /activities returns array; POST /activities creates one.
 * - Fields used: type, when/date, subject, notes, owner.
 *   We send { type, when, subject, notes, owner } and rely on backend to map/validate.
 */
const Activities = () => {
  const { data, error, isLoading, mutate } = useAPI('/activities');
  const activities = Array.isArray(data) ? data : (data?.items || []);

  const [form, setForm] = useState({
    type: 'Call',
    when: '',
    subject: '',
    notes: '',
    owner: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState('');

  const onInput = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const onSave = async () => {
    setSubmitting(true);
    setActionError('');
    try {
      await ActivitiesService.log({
        type: form.type,
        when: form.when || new Date().toISOString().slice(0, 10),
        subject: form.subject,
        notes: form.notes || undefined,
        owner: form.owner || undefined,
      });
      await mutate();
      setForm({ type: 'Call', when: '', subject: '', notes: '', owner: '' });
    } catch (e) {
      setActionError(e?.payload?.message || e.message || 'Failed to save activity');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid cols-2">
      <Card title="Log Activity" subtitle="Record calls, meetings, emails">
        {actionError && <div style={{ color: 'var(--color-error)', marginBottom: 8 }}>{actionError}</div>}
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
        {isLoading && <div className="helper">Loading activities…</div>}
        {error && <div style={{ color: 'var(--color-error)' }}>Error loading activities: {String(error.message || error)}</div>}
        {!isLoading && !error && (
          <table className="table">
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
        )}
      </Card>
    </div>
  );
};

export default Activities;
