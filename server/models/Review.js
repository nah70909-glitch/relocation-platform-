// ============================================================
// REVIEW MODEL
// ============================================================
// Defines the schema for user reviews on listings.
// Each review has a rating (1-5 stars) and a comment.
// Reviews are tied to both a user and a listing.
// ============================================================

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  // Who wrote this review (user's name for display)
  userName: {
    type: String,
    required: [true, 'User name is required'],
  },

  // User ID reference (if using auth)
  userId: {
    type: String,
    default: '',
  },

  // Which listing this review is for
  listingId: {
    type: String,
    required: [true, 'Listing ID is required'],
  },

  // Star rating from 1 to 5
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5'],
  },

  // The review text/comment
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    maxlength: [500, 'Comment cannot exceed 500 characters'],
  },

  // When the review was written
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Review', reviewSchema);
