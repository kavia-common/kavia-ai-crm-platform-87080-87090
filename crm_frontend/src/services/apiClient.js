//
// Lightweight API client around fetch with JSON helpers and basic error handling.
//
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000/api';

async function request(path, { method = 'GET', headers = {}, body } = {}) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const res = await fetch(`${API_BASE}${path}`, opts);
  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (!res.ok) {
    const errPayload = isJson ? await res.json().catch(() => ({})) : await res.text();
    const err = new Error(`API error: ${res.status}`);
    err.status = res.status;
    err.payload = errPayload;
    throw err;
  }

  return isJson ? res.json() : res.text();
}

// PUBLIC_INTERFACE
export function get(path) {
  /** Perform GET request to backend API. */
  return request(path, { method: 'GET' });
}

// PUBLIC_INTERFACE
export function post(path, body) {
  /** Perform POST request to backend API. */
  return request(path, { method: 'POST', body });
}

// PUBLIC_INTERFACE
export function put(path, body) {
  /** Perform PUT request to backend API. */
  return request(path, { method: 'PUT', body });
}

// PUBLIC_INTERFACE
export function del(path) {
  /** Perform DELETE request to backend API. */
  return request(path, { method: 'DELETE' });
}

export { API_BASE };
