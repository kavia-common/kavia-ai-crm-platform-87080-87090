import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Sidebar with grouped navigation, clear hover/active states, and optional collapsible sections.
 * - Larger touch targets and font sizes for legibility
 * - Ocean Professional accents for hover/active with smooth transitions
 * - Collapsible groups to handle many links (persist in-memory per session)
 */
const Sidebar = () => {
  // Track collapsed state for sections
  const [collapsed, setCollapsed] = useState({
    overview: false,
    records: false,
    team: false,
    admin: false,
  });

  const toggle = (key) =>
    setCollapsed((c) => ({ ...c, [key]: !c[key] }));

  // Build a reusable link renderer with icon+label
  const linkClass = ({ isActive }) =>
    `nav-item${isActive ? ' active' : ''}`;

  const GroupHeader = ({ title, id }) => (
    <button
      className="nav-group-header"
      onClick={() => toggle(id)}
      aria-expanded={!collapsed[id]}
      aria-controls={`group-${id}`}
    >
      <span className="nav-group-title">{title}</span>
      <span className={`chevron ${collapsed[id] ? 'collapsed' : ''}`}>▾</span>
    </button>
  );

  return (
    <div className="sidebar-inner">
      {/* Brand */}
      <div className="brand brand-compact">
        <div className="brand-badge" />
        <div>
          <div className="brand-name">Kavia CRM</div>
          <div className="helper">Ocean Professional</div>
        </div>
      </div>

      {/* Overview */}
      <div className="nav-section">
        <GroupHeader title="Overview" id="overview" />
        <div
          id="group-overview"
          className={`nav-group ${collapsed.overview ? 'is-collapsed' : ''}`}
        >
          <NavLink to="/dashboard" className={linkClass}>
            <span className="nav-icon">📊</span>
            <span className="nav-label">Dashboard</span>
          </NavLink>
          <NavLink to="/pipeline" className={linkClass}>
            <span className="nav-icon">🧭</span>
            <span className="nav-label">Pipeline</span>
          </NavLink>
          <NavLink to="/ai" className={linkClass}>
            <span className="nav-icon">🤖</span>
            <span className="nav-label">AI Insights</span>
          </NavLink>
        </div>
      </div>

      {/* Records */}
      <div className="nav-section">
        <GroupHeader title="Records" id="records" />
        <div
          id="group-records"
          className={`nav-group ${collapsed.records ? 'is-collapsed' : ''}`}
        >
          <NavLink to="/contacts" className={linkClass}>
            <span className="nav-icon">👤</span>
            <span className="nav-label">Contacts</span>
          </NavLink>
          <NavLink to="/accounts" className={linkClass}>
            <span className="nav-icon">🏢</span>
            <span className="nav-label">Accounts</span>
          </NavLink>
          <NavLink to="/deals" className={linkClass}>
            <span className="nav-icon">💼</span>
            <span className="nav-label">Deals</span>
          </NavLink>
          <NavLink to="/activities" className={linkClass}>
            <span className="nav-icon">📝</span>
            <span className="nav-label">Activities</span>
          </NavLink>
        </div>
      </div>

      {/* Team */}
      <div className="nav-section">
        <GroupHeader title="Team" id="team" />
        <div
          id="group-team"
          className={`nav-group ${collapsed.team ? 'is-collapsed' : ''}`}
        >
          <NavLink to="/team" className={linkClass}>
            <span className="nav-icon">👥</span>
            <span className="nav-label">Sales Team</span>
          </NavLink>
        </div>
      </div>

      {/* Admin */}
      <div className="nav-section">
        <GroupHeader title="Admin" id="admin" />
        <div
          id="group-admin"
          className={`nav-group ${collapsed.admin ? 'is-collapsed' : ''}`}
        >
          <NavLink to="/settings" className={linkClass}>
            <span className="nav-icon">⚙️</span>
            <span className="nav-label">Settings</span>
          </NavLink>
        </div>
      </div>

      {/* Footer helper - subtle contrast */}
      <div className="sidebar-footer helper">
        v0.1 • Modern UI
      </div>
    </div>
  );
};

export default Sidebar;
