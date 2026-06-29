// ============================================================
// LISTING MODEL
// ============================================================
// Defines the schema for service listings.
// Listings can be: Housing, Schools, or Hospitals/Doctors.
// Each listing belongs to a city and can have reviews.
// ============================================================

const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  // Title of the listing (e.g., "Sunrise Apartments", "Delhi Public School")
  title: {
    type: String,
    required: [true, 'Listing title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },

  // Category determines what type of service this listing represents
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['housing', 'school', 'hospital'],
  },

  // Reference to the city this listing belongs to
  city: {
    type: String,
    required: [true, 'City is required'],
  },

  // Specific location/address within the city
  location: {
    type: String,
    default: '',
  },

  // Detailed description of the service/place
  description: {
    type: String,
    required: [true, 'Description is required'],
  },

  // Contact information for the listing
  contact: {
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    website: { type: String, default: '' },
  },

  // Average rating (calculated from reviews)
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  // Total number of reviews
  reviewCount: {
    type: Number,
    default: 0,
  },

  // URL to listing image
  image: {
    type: String,
    default: '',
  },

  // Price information (e.g., "₹15,000/month" for housing)
  price: {
    type: String,
    default: '',
  },

  // Whether this listing has been verified by an admin
  verified: {
    type: Boolean,
    default: false,
  },

  // Who created this listing
  createdBy: {
    type: String,
    default: 'admin',
  },

  // Timestamp
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Listing', listingSchema);
