# Kavia CRM Frontend ↔ Backend Integration Notes

This document explains how to configure and troubleshoot the frontend when connecting to a backend API for contacts, accounts, deals, activities, and AI features.

## Environment variables

Create a `.env` file in `crm_frontend/`:

```
# Base URL for the backend API (without trailing slash)
REACT_APP_API_BASE=http://localhost:8000/api

# Set true if your backend uses cookie-based sessions and CORS supports credentials
REACT_APP_INCLUDE_CREDENTIALS=false
```

Notes:
- The frontend normalizes the base URL to avoid double slashes.
- When `REACT_APP_INCLUDE_CREDENTIALS=true`, the client sends `credentials: include` on fetch, which requires correct CORS settings on the backend.

## Expected endpoints

The services call the following endpoints:

- Contacts: 
  - GET/POST /contacts
  - GET/PUT/DELETE /contacts/:id
- Accounts: 
  - GET/POST /accounts
  - GET/PUT/DELETE /accounts/:id
- Deals:
  - GET/POST /deals
  - GET/PUT/DELETE /deals/:id
  - PUT /deals/:id/move with body { "stage": "<new stage>" }
- Activities:
  - GET /activities
  - POST /activities
- AI:
  - GET /ai/insights
  - POST /ai/lead-scoring
  - GET /ai/forecast

ID handling:
- UI tolerates either `id` or `_id` fields when rendering and deleting.

## Backend CORS configuration

If the frontend runs at http://localhost:3000 and backend at http://localhost:8000:

- Access-Control-Allow-Origin: http://localhost:3000
- Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
- Access-Control-Allow-Headers: Content-Type, Authorization
- Access-Control-Allow-Credentials: true (only if using cookies; also set REACT_APP_INCLUDE_CREDENTIALS=true)

For FastAPI example:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,  # set to False if not using cookies
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Common mismatches and how to adjust

- API base path: If your backend serves at `/` instead of `/api`, set `REACT_APP_API_BASE=http://localhost:8000`.
- Move endpoint: If backend uses PATCH or a different path (e.g., `/deals/:id` with `{ stage }`), update `DealsService.move` accordingly:
  - PATCH example: `return patch(\`/deals/${id}\`, { stage });`
  - Alternative path example: `return put(\`/pipeline/deals/${id}/stage\`, { stage });`
- Field names:
  - Contacts may expose `name` instead of `firstName`/`lastName`. The UI sends both `name` and separate fields when creating to maximize compatibility.
  - IDs: UI checks both `id` and `_id` keys for rendering and deletion.

## Error handling

- Network/CORS issues show as "Network error calling API" with status 0.
- Server errors (non-2xx) throw with `.status` and `.payload` containing parsed JSON if available, otherwise text.

## Verification checklist

- Contacts/Accounts/Deals pages:
  - List load succeeds (GET)
  - Create works (POST)
  - Delete works (DELETE)
- Pipeline:
  - Deals appear grouped by stage
  - Changing the stage triggers a request to move and refreshes the list
- Activities:
  - Listing and creating logs works

If something fails, check:
1) Browser console/network tab for CORS preflight or 404/500 errors
2) `REACT_APP_API_BASE` correctness and trailing slash
3) Backend CORS configuration
4) Endpoint method/path alignment (see adjustments above)
