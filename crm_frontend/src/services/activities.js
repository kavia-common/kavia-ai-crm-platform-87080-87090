import { get, post } from './apiClient';

// PUBLIC_INTERFACE
export const ActivitiesService = {
  /** List activities optionally filtered by entity (contact/account/deal). */
  async list(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return get(`/activities${qs ? `?${qs}` : ''}`);
  },
  /** Log an activity for an entity. */
  async log(payload) {
    return post('/activities', payload);
  },
};
