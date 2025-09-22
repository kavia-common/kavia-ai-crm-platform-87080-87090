import useSWR from 'swr';
import { API_BASE } from '../services/apiClient';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return res.json();
};

// PUBLIC_INTERFACE
export function useAPI(path, options = {}) {
  /**
   * Generic SWR hook for backend data fetching.
   * Returns { data, error, isLoading, mutate }
   */
  const key = path ? `${API_BASE}${path}` : null;
  const { data, error, isLoading, mutate } = useSWR(key, fetcher, options);
  return { data, error, isLoading, mutate };
}
