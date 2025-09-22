# Kavia CRM Frontend

Ocean Professional themed React app for CRM features: dashboards, pipeline, entities, activities, and AI insights.

## Run

- npm install
- npm start
- Open http://localhost:3000

## Env

Create a `.env` file at the root of crm_frontend with:
```
REACT_APP_API_BASE=https://your-backend.example.com/api
# set true only if your backend uses cookie-based sessions and CORS is configured for credentials
REACT_APP_INCLUDE_CREDENTIALS=false
```

If unset, the app uses http://localhost:8000/api for development.

See INTEGRATION-NOTES.md for full backend integration and CORS guidance.

## Structure

- src/components/layout: Sidebar, Topbar, Layout
- src/components/ui: Card, Tabs, Modal, EmptyState
- src/pages: Dashboard, Pipeline, Contacts, Accounts, Deals, Activities, AIInsights, Settings
- src/services: apiClient and entity services
- src/hooks: SWR-based useAPI

## Styling

- Ocean Professional theme variables in src/index.css
- Responsive grid with cards, tabbed entity views, modals, and pipeline columns.

## API

Services expect a REST backend like:
- GET/POST /contacts, /accounts, /deals
- PUT /deals/:id/move
- GET /activities, POST /activities
- GET /ai/insights, POST /ai/lead-scoring, GET /ai/forecast

You can wire services into pages by replacing mock data with service calls. If your backend differs in method/path, adjust the corresponding service method (e.g., DealsService.move).
