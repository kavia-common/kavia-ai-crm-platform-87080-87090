import React from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

/**
 * PUBLIC_INTERFACE
 * App layout container that renders sidebar, topbar and main content area.
 */
export function Layout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <Topbar />
      <main className="content">{children}</main>
    </div>
  );
}
