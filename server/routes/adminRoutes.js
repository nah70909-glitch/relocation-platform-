// ============================================================
// ADMIN ROUTES
// ============================================================
// Admin-specific endpoints for dashboard statistics and user management.
// All routes require authentication + admin role.
// ============================================================

const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const { getInMemoryUsers } = require('../controllers/authController');
const { getInMemoryListings } = require('../controllers/listingController');
const { getInMemoryReviews } = require('../controllers/reviewController');
const { cities } = require('../utils/seedData');

// ============================================================
// GET DASHBOARD STATS — GET /api/admin/stats
// ============================================================
router.get('/stats', protect, adminOnly, (req, res) => {
  const users = getInMemoryUsers();
  const listings = getInMemoryListings();
  const reviews = getInMemoryReviews();

  res.json({
    success: true,
    data: {
      totalUsers: users.length,
      totalListings: listings.length,
      totalReviews: reviews.length,
      totalCities: cities.length,
      verifiedListings: listings.filter(l => l.verified).length,
      unverifiedListings: listings.filter(l => !l.verified).length,
      categoryCounts: {
        housing: listings.filter(l => l.category === 'housing').length,
        school: listings.filter(l => l.category === 'school').length,
        hospital: listings.filter(l => l.category === 'hospital').length,
      },
    },
  });
});

// ============================================================
// GET ALL USERS — GET /api/admin/users
// ============================================================
router.get('/users', protect, adminOnly, (req, res) => {
  const users = getInMemoryUsers().map(u => ({
    _id: u._id,
    name: u.name,
    email: u.email,
    role: u.role,
    preferredCity: u.preferredCity,
    createdAt: u.createdAt,
  }));

  res.json({
    success: true,
    count: users.length,
    data: users,
  });
});

// ============================================================
// UPDATE USER ROLE — PUT /api/admin/users/:id
// ============================================================
router.put('/users/:id', protect, adminOnly, (req, res) => {
  const users = getInMemoryUsers();
  const userIndex = users.findIndex(u => u._id === req.params.id);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  if (req.body.role) {
    users[userIndex].role = req.body.role;
  }

  res.json({
    success: true,
    message: 'User updated successfully',
    data: {
      _id: users[userIndex]._id,
      name: users[userIndex].name,
      email: users[userIndex].email,
      role: users[userIndex].role,
    },
  });
});

module.exports = router;
