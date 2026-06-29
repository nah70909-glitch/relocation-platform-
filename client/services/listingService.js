// ============================================================
// LISTING SERVICE
// ============================================================
import api from './api';

export const listingService = {
  // Get all listings with optional filters
  getListings: async (filters = {}) => {
    const response = await api.get('/listings', { params: filters });
    return response.data;
  },

  // Get a single listing by ID
  getListingById: async (id) => {
    const response = await api.get(`/listings/${id}`);
    return response.data;
  },

  // Create a new listing (admin only)
  createListing: async (listingData) => {
    const response = await api.post('/listings', listingData);
    return response.data;
  },

  // Update a listing (admin only)
  updateListing: async (id, listingData) => {
    const response = await api.put(`/listings/${id}`, listingData);
    return response.data;
  },

  // Delete a listing (admin only)
  deleteListing: async (id) => {
    const response = await api.delete(`/listings/${id}`);
    return response.data;
  },
};
