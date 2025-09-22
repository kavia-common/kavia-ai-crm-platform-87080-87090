import { get, post, put, del } from './apiClient';

// PUBLIC_INTERFACE
export const ContactsService = {
  /** List contacts with optional query params (e.g., ?q=, ?page=). */
  async list(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return get(`/contacts${qs ? `?${qs}` : ''}`);
  },
  /** Retrieve a single contact by id. */
  async get(id) {
    return get(`/contacts/${id}`);
  },
  /** Create a new contact record. */
  async create(payload) {
    return post('/contacts', payload);
  },
  /** Update an existing contact. */
  async update(id, payload) {
    return put(`/contacts/${id}`, payload);
  },
  /** Delete a contact. */
  async remove(id) {
    return del(`/contacts/${id}`);
  },
};
