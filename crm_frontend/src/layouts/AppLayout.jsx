import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';

/**
 * PUBLIC_INTERFACE
 * AppLayout
 * Application shell with sidebar, topbar, and main content slot.
 */
export default function AppLayout({ children, onSearch }) {
  /** This is a public function. */
  return (
    <div className="app-shell">
      <Sidebar />
      <TopBar onSearch={onSearch} />
      <main className="app-main">
        {children}
      </main>
    </div>
  );
}
