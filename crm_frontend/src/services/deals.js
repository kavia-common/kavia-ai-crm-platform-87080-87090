import { get, post, put, del } from './apiClient';

// PUBLIC_INTERFACE
export const DealsService = {
  /** List deals with optional filters. */
  async list(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return get(`/deals${qs ? `?${qs}` : ''}`);
  },
  /** Get deal by id. */
  async get(id) {
    return get(`/deals/${id}`);
  },
  /** Create deal. */
  async create(payload) {
    return post('/deals', payload);
  },
  /** Update deal. */
  async update(id, payload) {
    return put(`/deals/${id}`, payload);
  },
  /** Delete deal. */
  async remove(id) {
    return del(`/deals/${id}`);
  },
  /** Move deal to a new stage in pipeline. */
  async move(id, stage) {
    return put(`/deals/${id}/move`, { stage });
  },
};
