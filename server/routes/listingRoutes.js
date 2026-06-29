// ============================================================
// LISTING ROUTES
// ============================================================
// Maps HTTP endpoints to listing controller functions.
// GET    /api/listings     — Get all listings (with filters)
// GET    /api/listings/:id — Get a specific listing
// POST   /api/listings     — Create a listing (admin only)
// PUT    /api/listings/:id — Update a listing (admin only)
// DELETE /api/listings/:id — Delete a listing (admin only)
// ============================================================

const express = require('express');
const router = express.Router();
const {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
} = require('../controllers/listingController');
const { protect, adminOnly } = require('../middleware/auth');

// Public routes — anyone can browse listings
router.get('/', getListings);
router.get('/:id', getListingById);

// Admin-only routes — requires authentication + admin role
router.post('/', protect, adminOnly, createListing);
router.put('/:id', protect, adminOnly, updateListing);
router.delete('/:id', protect, adminOnly, deleteListing);

module.exports = router;
