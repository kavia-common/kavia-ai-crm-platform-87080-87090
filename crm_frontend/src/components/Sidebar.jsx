import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Sidebar
 * Renders the main navigation using NavLink for active state.
 */
export default function Sidebar() {
  /** This is a public function. */
  const links = [
    { to: '/', label: 'Dashboard', icon: '📊', exact: true },
    { to: '/contacts', label: 'Contacts', icon: '👤' },
    { to: '/accounts', label: 'Accounts', icon: '🏢' },
    { to: '/deals', label: 'Deals', icon: '💼' },
    { to: '/activities', label: 'Activities', icon: '📝' },
    { to: '/pipeline', label: 'Pipeline', icon: '🧭' },
    { to: '/ai', label: 'AI Insights', icon: '🤖' },
  ];
  return (
    <div className="app-sidebar">
      <div className="brand">
        <div className="logo" />
        <span>Kavia CRM</span>
      </div>
      <div className="nav-group">
        <div className="nav-label">Main</div>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} end={l.exact} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <span>{l.icon}</span>
            <span>{l.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
