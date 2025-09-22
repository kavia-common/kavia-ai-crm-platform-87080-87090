import { get, post } from './apiClient';

// PUBLIC_INTERFACE
export const AIService = {
  /** Get AI insights summary (scores, forecast, health). */
  async insights() {
    return get('/ai/insights');
  },
  /** Score leads: returns scores for provided lead/contact ids. */
  async scoreLeads(payload) {
    return post('/ai/lead-scoring', payload);
  },
  /** Forecast revenue by time period and pipeline. */
  async forecast(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return get(`/ai/forecast${qs ? `?${qs}` : ''}`);
  },
};
