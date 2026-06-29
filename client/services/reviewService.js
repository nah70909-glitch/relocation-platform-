// ============================================================
// REVIEW SERVICE
// ============================================================
import api from './api';

export const reviewService = {
  // Get reviews for a specific listing
  getReviews: async (listingId) => {
    const response = await api.get(`/reviews/${listingId}`);
    return response.data;
  },

  // Create a new review (requires auth)
  createReview: async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  },
};
