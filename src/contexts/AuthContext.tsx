import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, type: 'researcher' | 'participant') => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('namikaUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, type: 'researcher' | 'participant') => {
    setLoading(true);
    
    // Mock login logic - replace with actual API call
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      type,
      createdAt: new Date().toISOString(),
      profile: type === 'researcher' ? {
        companyName: 'TechCorp Inc.',
        firstName: 'Sarah',
        lastName: 'Johnson',
        title: 'UX Research Lead',
        website: 'https://techcorp.com',
        description: 'Leading UX research initiatives for innovative products.',
        verified: true,
        studiesPosted: 12,
        totalSpent: 15600,
        rating: 4.8
      } : {
        firstName: 'Alex',
        lastName: 'Chen',
        age: 28,
        location: 'San Francisco, CA',
        occupation: 'Software Engineer',
        experience: ['Web Development', 'Mobile Apps', 'SaaS'],
        interests: ['Technology', 'Design', 'Productivity'],
        totalEarnings: 2400,
        studiesCompleted: 18,
        rating: 4.9,
        verified: true
      }
    };

    localStorage.setItem('namikaUser', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
  };

  const register = async (userData: any) => {
    setLoading(true);
    // Mock registration logic
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('namikaUser');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}