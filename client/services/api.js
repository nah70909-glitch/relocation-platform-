// ============================================================
// API SERVICE — Axios Instance
// ============================================================
// Creates a configured Axios instance for all API calls.
// Automatically attaches JWT token to requests.
// Handles common error scenarios.
// ============================================================

import axios from 'axios';

// Create Axios instance with base configuration
const api = axios.create({
  // In development: API runs on port 5000
  // In production: use the deployed backend URL
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// ============================================================
// REQUEST INTERCEPTOR
// ============================================================
// Runs before every request. Attaches the JWT token if available.

api.interceptors.request.use(
  (config) => {
    // Check if we're in the browser (not during SSR)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('relocity-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================
// Runs after every response. Handles common error patterns.

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token is expired/invalid, clear it and redirect to login
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('relocity-token');
        localStorage.removeItem('relocity-user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
