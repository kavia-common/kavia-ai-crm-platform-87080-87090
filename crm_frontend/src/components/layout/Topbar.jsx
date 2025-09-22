import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Topbar shows page title, search, and quick actions (new deal/contact).
 */
const Topbar = ({ onToggleSidebar }) => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const title = (() => {
    if (pathname.startsWith('/dashboard')) return 'Dashboard';
    if (pathname.startsWith('/pipeline')) return 'Sales Pipeline';
    if (pathname.startsWith('/contacts')) return 'Contacts';
    if (pathname.startsWith('/accounts')) return 'Accounts';
    if (pathname.startsWith('/deals')) return 'Deals';
    if (pathname.startsWith('/activities')) return 'Activities';
    if (pathname.startsWith('/ai')) return 'AI Insights';
    if (pathname.startsWith('/settings')) return 'Settings';
    return 'Kavia CRM';
  })();

  return (
    <>
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <button className="button" onClick={onToggleSidebar} aria-label="Toggle sidebar">☰</button>
        <h3 style={{margin:0}}>{title}</h3>
      </div>
      <div style={{display:'flex', alignItems:'center', gap:10}}>
        <input className="input" placeholder="Search contacts, accounts, deals..." style={{minWidth: 280}} />
        <button className="button" onClick={() => nav('/contacts')}>+ Contact</button>
        <button className="button primary" onClick={() => nav('/deals')}>+ Deal</button>
      </div>
    </>
  );
};

export default Topbar;
