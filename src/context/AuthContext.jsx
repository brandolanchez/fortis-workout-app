import React, { createContext, useState, useEffect, useMemo } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('ft_token'));

  useEffect(() => {
    if (token) {
      // try to fetch current user
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) setUser(data.user);
        })
        .catch(() => {
          // token invalid or server unreachable
          setUser(null);
          setToken(null);
          localStorage.removeItem('ft_token');
        });
    }
  }, [token]);

  const loginWithJwt = ({ token: jwt, user }) => {
    setToken(jwt);
    localStorage.setItem('ft_token', jwt);
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ft_token');
  };

  const fetchWithAuth = (url, opts = {}) => {
    const headers = opts.headers ? { ...opts.headers } : {};
    if (token) headers.Authorization = `Bearer ${token}`;
    return fetch(url, { ...opts, headers });
  };

  const value = useMemo(() => ({ user, token, loginWithJwt, logout, fetchWithAuth }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
