// ============================================================
// DATABASE CONFIGURATION
// ============================================================
// Handles MongoDB connection using Mongoose.
// If no MONGO_URI is provided, the server will still work
// using in-memory data (great for development without a database).
// ============================================================

const mongoose = require('mongoose');

// Track whether we're connected to a real database
let isConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  // If no MongoDB URI is provided, skip connection
  // The server will use in-memory/seed data instead
  if (!mongoURI) {
    console.log('⚠️  No MONGO_URI found in .env file');
    console.log('📦 Server will use in-memory seed data');
    console.log('💡 To connect MongoDB: add MONGO_URI to your .env file\n');
    return;
  }

  try {
    // Connect to MongoDB with recommended options
    const conn = await mongoose.connect(mongoURI, {
      // These options ensure stable connection behavior
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log('📦 Falling back to in-memory seed data\n');
  }
};

// Helper function to check if we have a live DB connection
const getConnectionStatus = () => isConnected;

module.exports = connectDB;
module.exports.getConnectionStatus = getConnectionStatus;
