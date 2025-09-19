# Kavia AI CRM Frontend

Responsive React frontend implementing the "Ocean Professional" style: blue and amber accents, minimalist design, rounded corners, subtle shadows and gradients.

## Tech Stack
- React 18 (Create React App)
- React Router v6
- Vanilla CSS (no heavy UI frameworks)

## Run
- Install: `npm install`
- Start: `npm start` (http://localhost:3000)
- Build: `npm run build`
- Test: `npm test`

## Configuration
Set the backend base URL via environment variable:

- Create `.env` from `.env.example`
```
REACT_APP_API_BASE_URL=http://localhost:8000
```

If not set, the app will use `/api` as base path.

## Structure
- src/theme/ocean.css: Ocean Professional theme
- src/components: Reusable UI (Sidebar, TopBar, Modal, DataTable, StatCard)
- src/layouts/AppLayout.jsx: App shell (sidebar + top bar + main)
- src/api/client.js: API client and AI endpoints
- src/pages:
  - Dashboard: key stats
  - Contacts, Accounts, Deals, Activities: full CRUD with modals
  - Pipeline: drag between stages (simple HTML5 drag/drop)
  - AIInsights: forecasting, lead scoring, win probability UI

## Routes
- / (Dashboard)
- /contacts
- /accounts
- /deals
- /activities
- /pipeline
- /ai

## Notes
- Backend endpoints used:
  - /contacts, /accounts, /deals, /activities CRUD
  - /ai/forecast, /ai/lead-score/:contactId, /ai/win-probability/:dealId, /ai/insights
- If a particular backend route is not yet implemented, UI will still render; some cards will show fallback demo values.

