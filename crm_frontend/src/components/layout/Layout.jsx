import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * PUBLIC_INTERFACE
 * Layout component rendering app shell with sidebar and topbar.
 */
const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-shell">
      <aside className="sidebar" style={{ display: sidebarOpen ? 'block' : 'none' }}>
        <Sidebar />
      </aside>
      <header className="topbar">
        <Topbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      </header>
      <main className="main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
