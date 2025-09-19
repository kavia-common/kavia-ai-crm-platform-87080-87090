import React from 'react';

/**
 * PUBLIC_INTERFACE
 * StatCard
 * Displays a metric value with a label and optional subtitle/accent.
 */
export default function StatCard({ label, value, hint, accent = 'primary' }) {
  /** This is a public function. */
  const accentColor = accent === 'secondary' ? 'var(--color-secondary)' : 'var(--color-primary)';
  return (
    <div className="stat">
      <div className="label">{label}</div>
      <div className="value" style={{ color: accentColor }}>{value}</div>
      {hint && <div className="label">{hint}</div>}
    </div>
  );
}
