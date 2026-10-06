import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('cpt_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('cpt_token') || null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (token) {
        try {
          const res = await authAPI.getMe();
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('cpt_user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.error('Session validation failed:', err);
          logout();
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (college_id, password) => {
    setAuthError(null);
    try {
      const res = await authAPI.login(college_id, password);

      if (res.success && res.user) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('cpt_token', res.token);
        localStorage.setItem('cpt_user', JSON.stringify(res.user));
        return { success: true, user: res.user };
      } else {
        const msg = res.message || 'Authentication failed.';
        setAuthError(msg);
        return { success: false, message: msg };
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
      setAuthError(errorMsg);
      return { success: false, message: errorMsg };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthError(null);
    localStorage.removeItem('cpt_token');
    localStorage.removeItem('cpt_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        role: user?.role || null,
        isLoading,
        authError,
        login,
        logout,
        setAuthError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
