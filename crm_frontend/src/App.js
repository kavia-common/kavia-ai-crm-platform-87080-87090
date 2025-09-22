import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Accounts from './pages/Accounts';
import Deals from './pages/Deals';
import Pipeline from './pages/Pipeline';
import Activities from './pages/Activities';
import AIInsights from './pages/AIInsights';
import Settings from './pages/Settings';

/**
 * PUBLIC_INTERFACE
 * App root component registering routes and global layout.
 * Routes:
 * - /dashboard: KPI overview and quick insights
 * - /pipeline: Kanban-style sales pipeline
 * - /contacts: Contact management
 * - /accounts: Account management
 * - /deals: Deal lists and management
 * - /activities: Activity logging and timeline
 * - /ai: AI lead scoring and forecasting
 * - /settings: App settings (placeholder)
 */
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/ai" element={<AIInsights />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<div style={{padding:20}}>Not Found</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
