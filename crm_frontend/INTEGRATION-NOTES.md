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

### Pipeline-specific assumptions and normalization

- Stage normalization: The frontend normalizes backend stage strings to lower-case words with spaces and replaces underscores/dashes with spaces. It also converts `&` to `and`. Example mappings:
  - "Prospecting" / "prospecting" / "PROSPECTING" -> "prospecting"
  - "discovery_call" -> "discovery call"
  - "negotiation & contracting" -> "negotiation and contracting"
- Canonical pipeline columns (in order):
  1. prospecting
  2. qualification
  3. discovery call
  4. demo
  5. poc proposal
  6. poc execution
  7. evaluation and feedback
  8. negotiation and contracting
  9. closed won
  10. closed lost
- Move endpoint: Default is `PUT /deals/:id/move` with body `{ "stage": "<normalized stage>" }`. If your backend differs:
  - PATCH usage: update DealsService.move to `patch('/deals/${id}', { stage })`
  - Alternate path: update DealsService.move to `put('/pipeline/deals/${id}/stage', { stage })`

### Response shape tolerance

- Lists can be either:
  - An array directly: `[...]`
  - An object wrapper with any of these array fields: `{ items: [...] }`, `{ results: [...] }`, `{ data: [...] }`
- The SWR hook `useAPI` now normalizes these automatically. Pages typically use:
  - `const { data } = useAPI('/deals')`
  - And then: `const list = Array.isArray(data) ? data : (data?.items || data?.results || data?.data || [])`

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

## Error handling

All requests use a shared apiClient with:
- Network errors thrown as `Error('Network error calling API: ...')` with `status=0`.
- Non-2xx responses throw an Error with `.status` and `.payload` containing parsed JSON when possible (otherwise response text).

## Verification checklist

- Contacts/Accounts/Deals pages:
  - List load succeeds (GET)
  - Create works (POST)
  - Delete works (DELETE)
- Pipeline:
  - Deals appear grouped by stage in columns above
  - Stage labels from backend are normalized (case, underscores, ampersand) and never cause deals to “disappear”
  - Changing the stage triggers a request to move and refreshes the list
- Activities:
  - Listing and creating logs works

If something fails, check:
1) Browser console/network tab for CORS preflight or 404/500 errors
2) `REACT_APP_API_BASE` correctness and trailing slash
3) Backend CORS configuration
4) Endpoint method/path alignment (see adjustments above)
