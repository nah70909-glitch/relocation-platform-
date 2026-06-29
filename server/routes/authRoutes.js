// ============================================================
// AUTH ROUTES
// ============================================================
// Maps HTTP endpoints to auth controller functions.
// POST /api/auth/register — Create a new account
// POST /api/auth/login    — Log in to existing account
// GET  /api/auth/me       — Get current user profile (protected)
// ============================================================

const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes (no auth required)
router.post('/register', register);
router.post('/login', login);

// Protected route (requires valid JWT token)
router.get('/me', protect, getMe);

module.exports = router;
