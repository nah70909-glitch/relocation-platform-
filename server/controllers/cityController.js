// ============================================================
// CITY CONTROLLER
// ============================================================
// Handles city guide data retrieval.
// Uses seed data when MongoDB is not connected.
// ============================================================

const { cities: seedCities } = require('../utils/seedData');

// ============================================================
// GET ALL CITIES — GET /api/cities
// ============================================================
// Returns all cities, optionally filtered by search query.
// Query params: ?search=Mumbai

const getCities = async (req, res) => {
  try {
    let results = [...seedCities];

    // Filter by search query if provided
    const { search } = req.query;
    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(city =>
        city.name.toLowerCase().includes(searchLower) ||
        city.description.toLowerCase().includes(searchLower)
      );
    }

    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch cities',
      error: error.message,
    });
  }
};

// ============================================================
// GET SINGLE CITY — GET /api/cities/:id
// ============================================================
// Returns detailed information for a specific city.

const getCityById = async (req, res) => {
  try {
    const city = seedCities.find(c => c._id === req.params.id);

    if (!city) {
      return res.status(404).json({
        success: false,
        message: 'City not found',
      });
    }

    res.json({
      success: true,
      data: city,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch city details',
      error: error.message,
    });
  }
};

module.exports = { getCities, getCityById };
