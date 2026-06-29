// ============================================================
// CITY ROUTES
// ============================================================
// Maps HTTP endpoints to city controller functions.
// GET /api/cities     — Get all cities (with optional search)
// GET /api/cities/:id — Get a specific city's details
// ============================================================

const express = require('express');
const router = express.Router();
const { getCities, getCityById } = require('../controllers/cityController');

// Public routes — anyone can browse city guides
router.get('/', getCities);
router.get('/:id', getCityById);

module.exports = router;
