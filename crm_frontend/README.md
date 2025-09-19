# Kavia CRM Frontend (Ocean Professional)

Modern, responsive React frontend for Kavia AI CRM. Implements the Ocean Professional theme (blue & amber accents), minimalist design, subtle shadows, rounded corners, and smooth transitions.

## Features
- App shell with sidebar navigation and top bar
- Dashboard with stat cards and AI forecast overview
- Entity pages: Contacts, Accounts, Deals
- Pipeline board with stages and quick move actions
- Activities logging with modal form
- AI Insights: lead scoring, forecast, win probability
- Responsive grid and accessible components
- Environment-driven API base URL

## Getting Started
1) Install
   npm install

2) Environment
   Copy .env.example to .env and set:
   REACT_APP_BACKEND_URL=http://localhost:8000

3) Run
   npm start

## Structure
- src/styles.css: Global styles per Ocean Professional theme
- src/theme.js: Theme tokens and CSS variable application
- src/services/api.js: API client (contacts, accounts, deals, pipeline, activities, AI)
- src/components/: Layout, Sidebar, Topbar, Card, Tabs, Modal, Badge
- src/pages/: Dashboard, Contacts, Accounts, Deals, Pipeline, Activities, AIInsights
- src/AppRouter.js: Routes and theme initialization
- src/App.js: Entry component rendering AppRouter

## Notes
- No UI frameworks; purely React + CSS for minimal bundle.
- Backend URL is not hardcoded; it must be provided via .env.
- Routes use react-router-dom v6.

