// ============================================================
// AUTH CONTROLLER
// ============================================================
// Handles user registration, login, and profile retrieval.
// Uses bcryptjs for password hashing and JWT for token generation.
// ============================================================

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../middleware/auth');
const { users: seedUsers } = require('../utils/seedData');

// In-memory user store (used when MongoDB is not connected)
let inMemoryUsers = [...seedUsers];

// Helper: Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' } // Token expires in 7 days
  );
};

// ============================================================
// REGISTER — POST /api/auth/register
// ============================================================
// Creates a new user account.
// Steps: validate input → check if email exists → hash password → save user → return token

const register = async (req, res) => {
  try {
    const { name, email, password, preferredCity } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    // Check if email already exists
    const existingUser = inMemoryUsers.find(u => u.email === email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      _id: `user-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      preferredCity: preferredCity || '',
      role: 'user',
      favorites: [],
      createdAt: new Date(),
    };

    // Save to in-memory store
    inMemoryUsers.push(newUser);

    // Generate token
    const token = generateToken(newUser);

    // Return user data (without password) and token
    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      data: {
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          preferredCity: newUser.preferredCity,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.',
      error: error.message,
    });
  }
};

// ============================================================
// LOGIN — POST /api/auth/login
// ============================================================
// Authenticates a user with email and password.
// Steps: find user → compare password → generate token → return

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find user by email
    const user = inMemoryUsers.find(u => u.email === email.toLowerCase());
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate token
    const token = generateToken(user);

    // Return user data and token
    res.json({
      success: true,
      message: 'Login successful!',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          preferredCity: user.preferredCity,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.',
      error: error.message,
    });
  }
};

// ============================================================
// GET ME — GET /api/auth/me
// ============================================================
// Returns the currently logged-in user's profile.
// Requires a valid JWT token (protect middleware).

const getMe = async (req, res) => {
  try {
    const user = inMemoryUsers.find(u => u._id === req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        preferredCity: user.preferredCity,
        favorites: user.favorites,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Could not fetch profile',
      error: error.message,
    });
  }
};

// Export for use in routes, plus inMemoryUsers for admin
module.exports = { register, login, getMe, getInMemoryUsers: () => inMemoryUsers };
