// ============================================================
// LISTING CONTROLLER
// ============================================================
// Handles CRUD operations for service listings.
// Supports filtering by city, category, price, rating, and search.
// ============================================================

const { listings: seedListings } = require('../utils/seedData');

// In-memory listings store
let inMemoryListings = [...seedListings];

// ============================================================
// GET ALL LISTINGS — GET /api/listings
// ============================================================
// Returns listings with optional filters.
// Query params: ?city=Mumbai&category=housing&rating=4&search=apartment&sort=rating

const getListings = async (req, res) => {
  try {
    let results = [...inMemoryListings];

    const { city, category, rating, search, sort, verified } = req.query;

    // Filter by city
    if (city) {
      results = results.filter(l => l.city.toLowerCase() === city.toLowerCase());
    }

    // Filter by category (housing, school, hospital)
    if (category) {
      results = results.filter(l => l.category === category.toLowerCase());
    }

    // Filter by minimum rating
    if (rating) {
      results = results.filter(l => l.rating >= parseFloat(rating));
    }

    // Filter by verified status
    if (verified !== undefined) {
      results = results.filter(l => l.verified === (verified === 'true'));
    }

    // Search in title, description, location
    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(l =>
        l.title.toLowerCase().includes(searchLower) ||
        l.description.toLowerCase().includes(searchLower) ||
        l.location.toLowerCase().includes(searchLower)
      );
    }

    // Sort results
    if (sort) {
      switch (sort) {
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'name':
          results.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          break;
      }
    }

    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch listings',
      error: error.message,
    });
  }
};

// ============================================================
// GET SINGLE LISTING — GET /api/listings/:id
// ============================================================

const getListingById = async (req, res) => {
  try {
    const listing = inMemoryListings.find(l => l._id === req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
    }

    res.json({
      success: true,
      data: listing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch listing',
      error: error.message,
    });
  }
};

// ============================================================
// CREATE LISTING — POST /api/listings
// ============================================================
// Admin only. Creates a new service listing.

const createListing = async (req, res) => {
  try {
    const { title, category, city, location, description, contact, image, price } = req.body;

    // Validate required fields
    if (!title || !category || !city || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, category, city, and description',
      });
    }

    const newListing = {
      _id: `listing-${Date.now()}`,
      title,
      category,
      city,
      location: location || '',
      description,
      contact: contact || { phone: '', email: '', website: '' },
      rating: 0,
      reviewCount: 0,
      image: image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600',
      price: price || '',
      verified: false,
      createdBy: req.user ? req.user.id : 'admin',
      createdAt: new Date(),
    };

    inMemoryListings.push(newListing);

    res.status(201).json({
      success: true,
      message: 'Listing created successfully!',
      data: newListing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not create listing',
      error: error.message,
    });
  }
};

// ============================================================
// UPDATE LISTING — PUT /api/listings/:id
// ============================================================
// Admin only. Updates an existing listing.

const updateListing = async (req, res) => {
  try {
    const index = inMemoryListings.findIndex(l => l._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
    }

    // Merge existing listing with updates
    inMemoryListings[index] = {
      ...inMemoryListings[index],
      ...req.body,
      _id: inMemoryListings[index]._id, // Prevent ID change
    };

    res.json({
      success: true,
      message: 'Listing updated successfully!',
      data: inMemoryListings[index],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not update listing',
      error: error.message,
    });
  }
};

// ============================================================
// DELETE LISTING — DELETE /api/listings/:id
// ============================================================
// Admin only. Removes a listing.

const deleteListing = async (req, res) => {
  try {
    const index = inMemoryListings.findIndex(l => l._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
    }

    const deletedListing = inMemoryListings.splice(index, 1)[0];

    res.json({
      success: true,
      message: 'Listing deleted successfully!',
      data: deletedListing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not delete listing',
      error: error.message,
    });
  }
};

module.exports = {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getInMemoryListings: () => inMemoryListings,
};
