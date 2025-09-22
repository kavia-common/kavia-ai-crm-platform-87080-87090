import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Sidebar with sections for navigation. Highlight active route.
 */
const Sidebar = () => {
  const linkClass = ({ isActive }) => `nav-item${isActive ? ' active' : ''}`;
  return (
    <div>
      <div className="brand">
        <div className="brand-badge" />
        <div>
          Kavia CRM
          <div className="helper">Ocean Professional</div>
        </div>
      </div>

      <div className="nav-section">
        <div className="nav-title">Overview</div>
        <NavLink to="/dashboard" className={linkClass}>📊 Dashboard</NavLink>
        <NavLink to="/pipeline" className={linkClass}>🧭 Pipeline</NavLink>
        <NavLink to="/ai" className={linkClass}>🤖 AI Insights</NavLink>
      </div>

      <div className="nav-section">
        <div className="nav-title">Records</div>
        <NavLink to="/contacts" className={linkClass}>👤 Contacts</NavLink>
        <NavLink to="/accounts" className={linkClass}>🏢 Accounts</NavLink>
        <NavLink to="/deals" className={linkClass}>💼 Deals</NavLink>
        <NavLink to="/activities" className={linkClass}>📝 Activities</NavLink>
      </div>

      <div className="nav-section">
        <div className="nav-title">Admin</div>
        <NavLink to="/settings" className={linkClass}>⚙️ Settings</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
