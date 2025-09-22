//
//
// Lightweight API client around fetch with JSON helpers and basic error handling.
// Adds normalization for base URL, optional credentials for CORS, and safer error parsing.
//
// PUBLIC_INTERFACE
const RAW_API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000/api';

/**
 * Normalize API base to avoid double slashes when joining with paths.
 * e.g., "http://x/api/" -> "http://x/api"
 */
const API_BASE = RAW_API_BASE.endsWith('/') ? RAW_API_BASE.slice(0, -1) : RAW_API_BASE;

/**
 * Whether to include credentials (cookies) in requests, useful when backend uses cookie sessions.
 * Configure via REACT_APP_INCLUDE_CREDENTIALS=true
 */
const INCLUDE_CREDENTIALS = String(process.env.REACT_APP_INCLUDE_CREDENTIALS || '').toLowerCase() === 'true';

/**
 * PUBLIC_INTERFACE
 * Perform an HTTP request against the backend.
 * - path: string starting with "/" relative to API base
 * - options: { method, headers, body }
 * Behavior:
 * - Sends JSON Content-Type by default
 * - Optionally includes credentials for CORS cookie-based auth if REACT_APP_INCLUDE_CREDENTIALS=true
 * - Parses JSON if content-type indicates JSON; otherwise returns text
 * - On non-2xx, throws Error with .status and .payload (JSON or text)
 */
async function request(path, { method = 'GET', headers = {}, body } = {}) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...(INCLUDE_CREDENTIALS ? { credentials: 'include' } : {}),
  };

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, opts);
  } catch (networkErr) {
    // Network-level failure (CORS blocked, DNS, refused, etc.)
    const err = new Error(`Network error calling API: ${networkErr?.message || 'Unknown error'}`);
    err.cause = networkErr;
    err.status = 0;
    err.payload = { message: 'Network error', details: String(networkErr) };
    throw err;
  }

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (!res.ok) {
    // Try JSON first; if fails, fallback to text
    let errPayload = {};
    if (isJson) {
      try {
        errPayload = await res.json();
      } catch {
        errPayload = {};
      }
    } else {
      try {
        errPayload = await res.text();
      } catch {
        errPayload = '';
      }
    }
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
