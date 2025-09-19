//
// Minimal API client for CRM frontend.
// Uses environment variable REACT_APP_BACKEND_URL as base. Do not hardcode.
//
const BASE_URL = process.env.REACT_APP_BACKEND_URL || "";

function buildUrl(path) {
  // Normalize double slashes
  return `${BASE_URL}${path}`.replace(/([^:]\/)\/+/g, "$1");
}

async function request(path, options = {}) {
  const url = buildUrl(path);
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  const res = await fetch(url, { ...options, headers });
  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    const err = new Error(`Request failed ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// PUBLIC_INTERFACE
export const api = {
  /** Contacts CRUD */
  getContacts: (q = "") => request(`/api/contacts${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  getContact: (id) => request(`/api/contacts/${id}`),
  createContact: (payload) => request(`/api/contacts`, { method: "POST", body: JSON.stringify(payload) }),
  updateContact: (id, payload) => request(`/api/contacts/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteContact: (id) => request(`/api/contacts/${id}`, { method: "DELETE" }),

  /** Accounts CRUD */
  getAccounts: () => request(`/api/accounts`),
  getAccount: (id) => request(`/api/accounts/${id}`),
  createAccount: (payload) => request(`/api/accounts`, { method: "POST", body: JSON.stringify(payload) }),
  updateAccount: (id, payload) => request(`/api/accounts/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteAccount: (id) => request(`/api/accounts/${id}`, { method: "DELETE" }),

  /** Deals CRUD + Pipeline */
  getDeals: () => request(`/api/deals`),
  getDeal: (id) => request(`/api/deals/${id}`),
  createDeal: (payload) => request(`/api/deals`, { method: "POST", body: JSON.stringify(payload) }),
  updateDeal: (id, payload) => request(`/api/deals/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteDeal: (id) => request(`/api/deals/${id}`, { method: "DELETE" }),
  getPipeline: () => request(`/api/pipeline`),
  moveDeal: (id, stage) => request(`/api/deals/${id}/move`, { method: "POST", body: JSON.stringify({ stage }) }),

  /** Activities */
  getActivities: () => request(`/api/activities`),
  createActivity: (payload) => request(`/api/activities`, { method: "POST", body: JSON.stringify(payload) }),

  /** AI Insights */
  getLeadScoring: () => request(`/api/ai/lead-scoring`),
  getForecast: () => request(`/api/ai/forecast`),
  getProbability: (dealId) => request(`/api/ai/probability?dealId=${encodeURIComponent(dealId)}`),

  /** Health */
  health: () => request(`/`),
};
