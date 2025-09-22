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
  const raw = await get(path);
  return normalizePayload(raw);
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
