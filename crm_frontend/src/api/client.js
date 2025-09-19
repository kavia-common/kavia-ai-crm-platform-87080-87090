/**
 * Simple API client for the CRM frontend.
 * Uses REACT_APP_API_BASE_URL from environment; defaults to '/api' if not provided.
 */
const BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

function buildUrl(path) {
  const slash = path.startsWith('/') ? '' : '/';
  return `${BASE_URL}${slash}${path}`;
}

/**
 * PUBLIC_INTERFACE
 * performRequest
 * A generic request helper that wraps fetch with JSON handling and error normalization.
 */
export async function performRequest(path, options = {}) {
  /** This is a public function. Performs an HTTP request and returns JSON or throws with normalized error. */
  const merged = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  };
  const res = await fetch(buildUrl(path), merged);
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error(data?.detail || data?.message || 'Request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * Convenience CRUD wrappers
 */
export const api = {
  // PUBLIC_INTERFACE
  list: (entity, params = {}) => {
    /** This is a public function. Lists entities with optional query params. */
    const qs = new URLSearchParams(params).toString();
    return performRequest(`/${entity}${qs ? `?${qs}` : ''}`);
  },
  // PUBLIC_INTERFACE
  get: (entity, id) => {
    /** This is a public function. Gets entity by id. */
    return performRequest(`/${entity}/${id}`);
  },
  // PUBLIC_INTERFACE
  create: (entity, payload) => {
    /** This is a public function. Creates an entity with payload. */
    return performRequest(`/${entity}`, { method: 'POST', body: JSON.stringify(payload) });
  },
  // PUBLIC_INTERFACE
  update: (entity, id, payload) => {
    /** This is a public function. Updates an entity by id. */
    return performRequest(`/${entity}/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
  },
  // PUBLIC_INTERFACE
  remove: (entity, id) => {
    /** This is a public function. Deletes an entity by id. */
    return performRequest(`/${entity}/${id}`, { method: 'DELETE' });
  },
  // PUBLIC_INTERFACE
  ai: {
    /** This is a public function. Calls AI endpoints like lead-scoring, forecasting. */
    insights: (params = {}) => {
      const qs = new URLSearchParams(params).toString();
      return performRequest(`/ai/insights${qs ? `?${qs}` : ''}`);
    },
    leadScore: (contactId) => performRequest(`/ai/lead-score/${contactId}`),
    forecast: (period = 'this_quarter') => performRequest(`/ai/forecast?period=${encodeURIComponent(period)}`),
    winProbability: (dealId) => performRequest(`/ai/win-probability/${dealId}`),
  },
};

export default api;
