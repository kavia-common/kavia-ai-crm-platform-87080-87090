import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './theme/ocean.css';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Accounts from './pages/Accounts';
import Deals from './pages/Deals';
import Activities from './pages/Activities';
import Pipeline from './pages/Pipeline';
import AIInsights from './pages/AIInsights';

// PUBLIC_INTERFACE
function App() {
  /** This is a public function. Main application entry with routing and layout. */
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/ai" element={<AIInsights />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
