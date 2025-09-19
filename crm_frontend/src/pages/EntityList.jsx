import React, { useEffect, useMemo, useState } from 'react';
import api from '../api/client';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

/**
 * PUBLIC_INTERFACE
 * createEntityPage
 * Factory to create standardized CRUD list pages with modal forms.
 */
export function createEntityPage({ entity, title, columns, fields }) {
  /** This is a public function. */
  return function EntityPage() {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({});
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const defaultForm = useMemo(() => Object.fromEntries(fields.map(f => [f.name, f.default ?? ''])), [fields]);

    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await api.list(entity);
        setRows(Array.isArray(data) ? data : (data?.items || []));
      } catch (e) {
        setError(e.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => { load(); }, []);

    const openCreate = () => {
      setEditing(null);
      setForm(defaultForm);
      setOpen(true);
    };
    const openEdit = (row) => {
      setEditing(row);
      setForm(fields.reduce((acc, f) => ({ ...acc, [f.name]: row[f.name] ?? '' }), {}));
      setOpen(true);
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        if (editing?.id != null) {
          await api.update(entity, editing.id, form);
        } else {
          await api.create(entity, form);
        }
        setOpen(false);
        await load();
      } catch (er) {
        setError(er.message || 'Save failed');
      }
    };

    const onDelete = async (row) => {
      if (!window.confirm('Delete this item?')) return;
      try {
        await api.remove(entity, row.id);
        await load();
      } catch (er) {
        setError(er.message || 'Delete failed');
      }
    };

    return (
      <div>
        <div className="card">
          <div className="card-header">
            <div style={{ fontWeight: 800 }}>{title}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn ghost" onClick={load} aria-label="Refresh">Refresh</button>
              <button className="btn" onClick={openCreate} aria-label={`Add ${title}`}>+ New</button>
            </div>
          </div>
          <div className="card-body">
            {error && <div style={{ color: 'var(--color-error)', marginBottom: 8 }}>{error}</div>}
            {loading ? 'Loading...' : <DataTable columns={columns} rows={rows} onEdit={openEdit} onDelete={onDelete} />}
          </div>
        </div>

        <Modal
          open={open}
          title={`${editing ? 'Edit' : 'New'} ${title.slice(0, -1)}`}
          onClose={() => setOpen(false)}
          footer={
            <>
              <button className="btn ghost" onClick={() => setOpen(false)}>Cancel</button>
              <button className="btn" form="entity-form" type="submit">Save</button>
            </>
          }
        >
          <form id="entity-form" onSubmit={onSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {fields.map(f => (
                <div key={f.name} style={{ gridColumn: f.full ? 'span 2' : 'span 1' }}>
                  <label style={{ display: 'block', fontSize: 12, color: '#6B7280', marginBottom: 6 }}>{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea className="textarea" value={form[f.name] ?? ''} onChange={(e)=>setForm({ ...form, [f.name]: e.target.value })} />
                  ) : f.type === 'select' ? (
                    <select className="select" value={form[f.name] ?? ''} onChange={(e)=>setForm({ ...form, [f.name]: e.target.value })}>
                      <option value="">Choose...</option>
                      {(f.options || []).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : (
                    <input className="input" type={f.type || 'text'} value={form[f.name] ?? ''} onChange={(e)=>setForm({ ...form, [f.name]: e.target.value })} />
                  )}
                </div>
              ))}
            </div>
          </form>
        </Modal>
      </div>
    );
  };
}
