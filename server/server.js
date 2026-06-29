// ============================================================
// SERVER.JS — Main Express Server Entry Point
// ============================================================
// This is where our backend application starts.
// It configures Express, connects to MongoDB, and mounts all routes.
// ============================================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();

// ============================================================
// MIDDLEWARE SETUP
// ============================================================

// Enable CORS — allows our Next.js frontend to make requests to this server
// Without this, the browser would block requests from localhost:3000 to localhost:5000
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// Parse JSON request bodies — allows us to read req.body as JSON
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// ============================================================
// DATABASE CONNECTION
// ============================================================

// Connect to MongoDB (will use in-memory fallback if no connection string)
connectDB();

// ============================================================
// API ROUTES
// ============================================================

// Mount route modules at their respective paths
// Each route file handles a specific resource (auth, cities, listings, reviews)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cities', require('./routes/cityRoutes'));
app.use('/api/listings', require('./routes/listingRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Simple health check endpoint — useful for deployment monitoring
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ReloCity API is running!' });
});

// ============================================================
// ERROR HANDLING
// ============================================================

// Global error handler — catches all errors from routes/middleware
// Must be registered AFTER all routes
app.use(errorHandler);

// ============================================================
// START SERVER
// ============================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 ReloCity API Server running on port ${PORT}`);
  console.log(`📡 API available at: http://localhost:${PORT}/api`);
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health\n`);
});
