import React, { useMemo, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * DataTable
 * Renders a simple table with optional sorting and row actions.
 */
export default function DataTable({ columns, rows, onEdit, onDelete }) {
  /** This is a public function. */
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const sorted = useMemo(() => {
    if (!sortKey) return rows || [];
    const sortedRows = [...(rows || [])].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va == null) return -1;
      if (vb == null) return 1;
      if (typeof va === 'number' && typeof vb === 'number') {
        return va - vb;
      }
      return String(va).localeCompare(String(vb));
    });
    return sortDir === 'asc' ? sortedRows : sortedRows.reverse();
  }, [rows, sortKey, sortDir]);

  const onSort = (key) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className="card">
      <div className="card-body" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} onClick={() => onSort(c.key)} style={{ cursor: 'pointer', userSelect: 'none' }}>
                  {c.label}{' '}
                  {sortKey === c.key ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                </th>
              ))}
              {(onEdit || onDelete) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row.id ?? JSON.stringify(row)}>
                {columns.map((c) => (
                  <td key={c.key}>
                    {c.render ? c.render(row[c.key], row) : String(row[c.key] ?? '')}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {onEdit && <button className="btn ghost" onClick={() => onEdit(row)} aria-label="Edit">Edit</button>}{' '}
                    {onDelete && <button className="btn ghost" onClick={() => onDelete(row)} aria-label="Delete">Delete</button>}
                  </td>
                )}
              </tr>
            ))}
            {!sorted.length && (
              <tr>
                <td colSpan={(columns?.length || 0) + ((onEdit || onDelete) ? 1 : 0)} style={{ color: '#6B7280', padding: 16 }}>
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
