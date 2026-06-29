// ============================================================
// USER MODEL
// ============================================================
// Defines the schema for user accounts.
// Handles: registration data, password hashing, roles, favorites.
// ============================================================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // User's full name
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },

  // Email address — must be unique (used for login)
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },

  // Password — will be hashed before saving
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false, // Don't include password in queries by default
  },

  // The city the user is interested in relocating to
  preferredCity: {
    type: String,
    default: '',
  },

  // User role — determines access level
  // 'user' = regular user, 'admin' = can manage listings and users
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  // Array of listing IDs the user has favorited/saved
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
  }],

  // Account creation timestamp
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ============================================================
// PASSWORD HASHING MIDDLEWARE
// ============================================================
// Before saving a user, hash their password using bcryptjs.
// This runs automatically whenever a user document is saved.
// The 'salt' adds randomness so identical passwords produce different hashes.

userSchema.pre('save', async function (next) {
  // Only hash the password if it was modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  // Generate a salt (random data) with 10 rounds of processing
  const salt = await bcrypt.genSalt(10);

  // Hash the password with the salt
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// ============================================================
// PASSWORD COMPARISON METHOD
// ============================================================
// Compares a plain text password with the stored hashed password.
// Used during login to verify the user's credentials.

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export the model
module.exports = mongoose.model('User', userSchema);
