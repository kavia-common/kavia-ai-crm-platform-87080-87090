import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, label, icon }) => (
  <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
    <span style={{ width: 18, textAlign: "center" }}>{icon}</span>
    <span>{label}</span>
  </NavLink>
);

/**
 * Sidebar navigation with brand and primary routes
 */
export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">KA</div>
        <div className="brand-title">
          <span className="name">Kavia CRM</span>
          <span className="tag">Ocean Professional</span>
        </div>
      </div>
      <nav className="nav">
        <NavItem to="/" label="Dashboard" icon="📊" />
        <NavItem to="/contacts" label="Contacts" icon="👤" />
        <NavItem to="/accounts" label="Accounts" icon="🏢" />
        <NavItem to="/deals" label="Deals" icon="💼" />
        <NavItem to="/pipeline" label="Pipeline" icon="🧩" />
        <NavItem to="/activities" label="Activities" icon="📝" />
        <NavItem to="/ai" label="AI Insights" icon="🤖" />
      </nav>
    </aside>
  );
}
