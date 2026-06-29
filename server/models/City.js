// ============================================================
// CITY MODEL
// ============================================================
// Defines the schema for city guides.
// Each city has overview info, cost of living breakdown,
// transport options, famous areas, and more.
// ============================================================

const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  // City name (e.g., "Mumbai", "Bangalore")
  name: {
    type: String,
    required: [true, 'City name is required'],
    unique: true,
    trim: true,
  },

  // Brief description of the city
  description: {
    type: String,
    required: [true, 'City description is required'],
  },

  // URL to the city's cover image
  image: {
    type: String,
    default: '',
  },

  // Cost of living breakdown for the city
  costOfLiving: {
    rent: {
      type: Number,  // Average monthly rent in INR
      default: 0,
    },
    food: {
      type: Number,  // Average monthly food cost in INR
      default: 0,
    },
    transport: {
      type: Number,  // Average monthly transport cost in INR
      default: 0,
    },
    overall: {
      type: String,  // Summary rating
      enum: ['Low', 'Medium', 'High', 'Very High'],
      default: 'Medium',
    },
  },

  // Available transport options in the city
  transport: [{
    type: String,  // e.g., "Metro", "Bus", "Auto", "Cab"
  }],

  // Notable areas/neighborhoods in the city
  famousAreas: [{
    name: { type: String },
    description: { type: String },
  }],

  // Major hospitals in the city
  hospitals: [{
    type: String,
  }],

  // Notable schools/educational institutions
  schools: [{
    type: String,
  }],

  // Lifestyle description
  lifestyle: {
    type: String,
    default: '',
  },

  // Population info
  population: {
    type: String,
    default: '',
  },

  // Timestamp
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('City', citySchema);
