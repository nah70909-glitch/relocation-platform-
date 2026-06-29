'use client';

// ============================================================
// AUTH CONTEXT
// ============================================================
// Provides authentication state and functions to the entire app.
// Stores user data and JWT token in localStorage.
// Wraps the app in a context provider so any component can
// access auth state with useAuth().
// ============================================================

import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';

// Create the context
const AuthContext = createContext(null);

// ============================================================
// AUTH PROVIDER COMPONENT
// ============================================================
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // Current user data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error messages

  // ============================================================
  // CHECK AUTH ON MOUNT
  // ============================================================
  // When the app loads, check if there's a saved token and user
  useEffect(() => {
    const savedUser = localStorage.getItem('relocity-user');
    const savedToken = localStorage.getItem('relocity-token');

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        // Invalid data in localStorage, clear it
        localStorage.removeItem('relocity-user');
        localStorage.removeItem('relocity-token');
      }
    }
    setLoading(false);
  }, []);

  // ============================================================
  // LOGIN
  // ============================================================
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authService.login({ email, password });

      if (response.success) {
        const { user: userData, token } = response.data;

        // Save to state
        setUser(userData);

        // Save to localStorage (persists across page refreshes)
        localStorage.setItem('relocity-user', JSON.stringify(userData));
        localStorage.setItem('relocity-token', token);

        return { success: true };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // REGISTER
  // ============================================================
  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authService.register(userData);

      if (response.success) {
        const { user: newUser, token } = response.data;

        setUser(newUser);
        localStorage.setItem('relocity-user', JSON.stringify(newUser));
        localStorage.setItem('relocity-token', token);

        return { success: true };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOGOUT
  // ============================================================
  const logout = () => {
    setUser(null);
    localStorage.removeItem('relocity-user');
    localStorage.removeItem('relocity-token');
  };

  // ============================================================
  // CONTEXT VALUE
  // ============================================================
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================================================
// CUSTOM HOOK — useAuth()
// ============================================================
// Usage in any component:
//   const { user, login, logout, isAuthenticated } = useAuth();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
