import useSWR from 'swr';
import { get } from '../services/apiClient';

/**
 * Normalize API response shapes to a consistent value:
 * - If array: return array.
 * - If object with items/results/data: return that field (prefer items, then results, then data).
 * - Otherwise, return the object as-is.
 */
function normalizePayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.items)) return payload.items;
    if (Array.isArray(payload.results)) return payload.results;
    if (Array.isArray(payload.data)) return payload.data;
  }
  return payload;
}

const fetcher = async (path) => {
  // Use apiClient.get to ensure credentials and error handling are consistent
  try {
    const raw = await get(path);
    const norm = normalizePayload(raw);
    // Lightweight debug – only logs when a special flag is present in URL
    if (typeof window !== 'undefined') {
      const dbg = new URLSearchParams(window.location.search).get('debugPipeline') === '1';
      if (dbg && path === '/deals') {
        // eslint-disable-next-line no-console
        console.log('[useAPI] GET', path, 'payload sample:', Array.isArray(norm) ? norm.slice(0, 3) : norm);
      }
    }
    return norm;
  } catch (e) {
    if (typeof window !== 'undefined') {
      const dbg = new URLSearchParams(window.location.search).get('debugPipeline') === '1';
      if (dbg && path === '/deals') {
        // eslint-disable-next-line no-console
        console.error('[useAPI] GET /deals failed:', { message: e?.message, status: e?.status, payload: e?.payload });
      }
    }
    throw e;
  }
};

// PUBLIC_INTERFACE
export function useAPI(path, options = {}) {
  /**
   * Generic SWR hook for backend data fetching via apiClient.get.
   * Returns { data, error, isLoading, mutate }
   * The returned `data` is normalized using normalizePayload.
   */
  const key = path || null; // fetcher receives the path and will call apiClient.get
  const { data, error, isLoading, mutate } = useSWR(key, fetcher, options);
  return { data, error, isLoading, mutate };
}
