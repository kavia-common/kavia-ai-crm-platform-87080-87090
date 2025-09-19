import React from 'react';

/**
 * PUBLIC_INTERFACE
 * TopBar
 * Renders the top app bar with search and user avatar.
 */
export default function TopBar({ onSearch }) {
  /** This is a public function. */
  return (
    <div className="app-topbar">
      <div className="search">
        <span role="img" aria-label="search">🔎</span>
        <input placeholder="Search contacts, accounts, deals..." onChange={(e)=>onSearch?.(e.target.value)} />
      </div>
      <div className="user-chip">
        <div className="avatar">KA</div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 700 }}>Kavia Agent</div>
          <div style={{ fontSize: 12, color: '#6B7280' }}>Sales Manager</div>
        </div>
      </div>
    </div>
  );
}
