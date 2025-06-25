import React, { useState, useEffect, createContext } from 'react';
import { api } from '../utils/wrappers'
import { User } from '@/types';

export interface AuthContextType {
  login: (email: string, password: string) => Promise<true | string>;
  register: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => Promise<true | string>;
  logout: () => void;
  isLoading: boolean;
  user: User;
  token: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null); // JWT Token
  const [isLoading, setIsLoading] = useState(true);
  
  const saveAuthResponse = (response: { user: User, token: string} ) => {
    const { user, token } = response;
    setUser(user);
    setToken(token);
    // Set for session usage + displaying their info
    localStorage.setItem('canvassing_user', JSON.stringify(user))
    localStorage.setItem('canvassing_token', JSON.stringify(token));
  }

  useEffect(() => {
    // Check for existing session on app load
    setToken(JSON.parse(localStorage.getItem('canvassing_token') || null));
    setUser(JSON.parse(localStorage.getItem('canvassing_user') || null));
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<true | string> => {
    setIsLoading(true);
    try {
      // Try to login. Api wrapper will throw on error
      console.log('[Auth Provider]: Logging in user');
      const response = await api(`/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      // Save to local storage and state
      saveAuthResponse(response);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.log('[AuthContext] Login error:', error);
      setIsLoading(false);
      return error;
    }
  };

  const register = async (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<true | string> => {
    setIsLoading(true);
    try {
      console.log('[Auth Provider]: Registering user');
      const response = await api(`/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      // Save to local storage and state
      saveAuthResponse(response);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('[AuthProvider] Registration error:', error);
      setIsLoading(false);
      return error.message;
    }
  };

  const logout = () => {
    console.log('[AuthProvider] Logging out user');
    // Reset user data and token
    setUser(null);
    setToken(null);
    // Remove the locally stored data + token upon logout
    localStorage.removeItem('canvassing_user');
    localStorage.removeItem('canvassing_token');
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
