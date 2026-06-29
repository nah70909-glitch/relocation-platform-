// ============================================================
// ERROR HANDLER MIDDLEWARE
// ============================================================
// Catches all errors thrown in route handlers and middleware.
// Returns a consistent JSON error response to the client.
// This prevents the server from crashing on unhandled errors.
// ============================================================

const errorHandler = (err, req, res, next) => {
  // Log the error for debugging (visible in terminal)
  console.error('❌ Error:', err.message);

  // Default to 500 (Internal Server Error) if no status code is set
  const statusCode = err.statusCode || 500;

  // Send JSON error response
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Only include stack trace in development mode
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
