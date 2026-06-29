// ============================================================
// AUTH MIDDLEWARE
// ============================================================
// Protects routes that require authentication.
// Verifies the JWT token from the Authorization header.
// Adds the decoded user data to req.user for downstream use.
// ============================================================

const jwt = require('jsonwebtoken');

// The secret key used to sign/verify JWTs
const JWT_SECRET = process.env.JWT_SECRET || 'relocity-secret-key-change-in-production';

// ============================================================
// PROTECT MIDDLEWARE
// ============================================================
// Use this middleware on any route that requires a logged-in user.
// It checks for a valid JWT token in the Authorization header.
//
// Usage: router.get('/protected-route', protect, handler)

const protect = (req, res, next) => {
  try {
    // Get token from Authorization header
    // Format: "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Please log in.',
      });
    }

    // Extract the token (remove "Bearer " prefix)
    const token = authHeader.split(' ')[1];

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user data to the request object
    // Now any downstream handler can access req.user
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token is invalid or expired. Please log in again.',
    });
  }
};

// ============================================================
// ADMIN MIDDLEWARE
// ============================================================
// Use this AFTER the protect middleware to restrict access to admins only.
//
// Usage: router.delete('/admin-route', protect, adminOnly, handler)

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.',
    });
  }
};

module.exports = { protect, adminOnly, JWT_SECRET };
