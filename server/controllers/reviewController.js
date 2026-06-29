// ============================================================
// REVIEW CONTROLLER
// ============================================================
// Handles creating and retrieving reviews for listings.
// Updates the listing's average rating when a new review is added.
// ============================================================

const { reviews: seedReviews, listings: seedListings } = require('../utils/seedData');

// In-memory review store
let inMemoryReviews = [...seedReviews];

// ============================================================
// GET REVIEWS BY LISTING — GET /api/reviews/:listingId
// ============================================================
// Returns all reviews for a specific listing.

const getReviewsByListing = async (req, res) => {
  try {
    const { listingId } = req.params;

    // Find all reviews for this listing
    const reviews = inMemoryReviews
      .filter(r => r.listingId === listingId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Newest first

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch reviews',
      error: error.message,
    });
  }
};

// ============================================================
// CREATE REVIEW — POST /api/reviews
// ============================================================
// Requires authentication. Adds a new review to a listing.
// Also updates the listing's average rating and review count.

const createReview = async (req, res) => {
  try {
    const { listingId, rating, comment } = req.body;

    // Validate required fields
    if (!listingId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide listingId, rating, and comment',
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5',
      });
    }

    // Create the review
    const newReview = {
      _id: `review-${Date.now()}`,
      userName: req.user ? req.user.name : 'Anonymous',
      userId: req.user ? req.user.id : '',
      listingId,
      rating: parseInt(rating),
      comment,
      createdAt: new Date(),
    };

    // Add to in-memory store
    inMemoryReviews.push(newReview);

    res.status(201).json({
      success: true,
      message: 'Review added successfully!',
      data: newReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not add review',
      error: error.message,
    });
  }
};

module.exports = { getReviewsByListing, createReview, getInMemoryReviews: () => inMemoryReviews };
