import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { applyTheme } from "./theme";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Contacts } from "./pages/Contacts";
import { Accounts } from "./pages/Accounts";
import { Deals } from "./pages/Deals";
import { Pipeline } from "./pages/Pipeline";
import { Activities } from "./pages/Activities";
import { AIInsights } from "./pages/AIInsights";

/**
 * PUBLIC_INTERFACE
 * AppRouter initializes the Ocean Professional theme and sets up routes.
 */
export function AppRouter() {
  useEffect(() => {
    applyTheme();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/ai" element={<AIInsights />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
