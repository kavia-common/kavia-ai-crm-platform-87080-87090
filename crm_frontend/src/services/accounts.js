import { get, post, put, del } from './apiClient';

// PUBLIC_INTERFACE
export const AccountsService = {
  /** List accounts. */
  async list(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return get(`/accounts${qs ? `?${qs}` : ''}`);
  },
  /** Retrieve account by id. */
  async get(id) {
    return get(`/accounts/${id}`);
  },
  /** Create account. */
  async create(payload) {
    return post('/accounts', payload);
  },
  /** Update account. */
  async update(id, payload) {
    return put(`/accounts/${id}`, payload);
  },
  /** Delete account. */
  async remove(id) {
    return del(`/accounts/${id}`);
  },
};
