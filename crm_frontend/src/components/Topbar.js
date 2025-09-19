import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Top app bar with search and quick actions
 */
export function Topbar() {
  const navigate = useNavigate();
  return (
    <header className="topbar">
      <div className="search">
        <span>🔎</span>
        <input placeholder="Search contacts, accounts, deals..." aria-label="Global search" />
      </div>
      <div className="actions">
        <button className="btn secondary" onClick={() => navigate("/deals")}>New Deal</button>
        <button className="btn" onClick={() => navigate("/contacts")}>Add Contact</button>
      </div>
    </header>
  );
}
