// ============================================================
// CITY SERVICE
// ============================================================
import api from './api';

export const cityService = {
  // Get all cities (with optional search)
  getCities: async (search = '') => {
    const params = search ? { search } : {};
    const response = await api.get('/cities', { params });
    return response.data;
  },

  // Get a single city by ID
  getCityById: async (id) => {
    const response = await api.get(`/cities/${id}`);
    return response.data;
  },
};
