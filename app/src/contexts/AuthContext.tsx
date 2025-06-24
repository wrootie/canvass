
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { api } from '../utils/wrappers'
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<true | string>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<true | string>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const savedToken = localStorage.getItem('canvassing_token');
    if (savedToken) {
      setUser(JSON.parse(savedToken));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<true | string> => {
    setIsLoading(true);
    try {
      // Try to login. Api wrapper will throw on error
      const response = await api(`/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const { user } = response;
      setUser(user);
      localStorage.setItem('canvassing_token', JSON.stringify(response.token));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.log('[AuthContext] Login error:', error);
      setIsLoading(false);
      return error;
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string): Promise<true | string> => {
    setIsLoading(true);
    try {
      const response = await api(`/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      
      const { user } = response;
        setUser(user);
      localStorage.setItem('canvassing_token', JSON.stringify(response.token));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return error.message;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('canvassing_token');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
