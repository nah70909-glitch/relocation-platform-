// ============================================================
// REVIEW ROUTES
// ============================================================
// Maps HTTP endpoints to review controller functions.
// GET  /api/reviews/:listingId — Get all reviews for a listing
// POST /api/reviews            — Add a review (requires auth)
// ============================================================

const express = require('express');
const router = express.Router();
const { getReviewsByListing, createReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

// Public route — anyone can read reviews
router.get('/:listingId', getReviewsByListing);

// Protected route — must be logged in to write a review
router.post('/', protect, createReview);

module.exports = router;
