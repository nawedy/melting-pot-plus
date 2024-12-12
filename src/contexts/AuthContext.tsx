'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, AuthContextType } from '@/types/auth';

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'SET_LOADING'; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        user: null,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isLoading: false,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for stored session
    const checkAuth = async () => {
      try {
        const session = localStorage.getItem('user');
        if (session) {
          dispatch({ type: 'LOGIN_SUCCESS', payload: JSON.parse(session) });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // Implement your login logic here
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const user = await response.json();
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Invalid credentials' });
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // Implement your registration logic here
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) throw new Error('Registration failed');

      const user = await response.json();
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: 'Registration failed' });
      throw error;
    }
  };

  const logout = async () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      // Implement your user update logic here
      const response = await fetch('/api/auth/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Update failed');

      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: data });
    } catch (error) {
      console.error('Update failed:', error);
      throw error;
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 