'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_USERS } from '@/lib/mock-data';
import { UserResponse } from '@/type';

interface AuthContextType {
  user: UserResponse | null;
  login: (email: string) => Promise<UserResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Simulate loading
  const router = useRouter();

  // Simulate persistent session check
  useEffect(() => {
    const storedUser = localStorage.getItem('cms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string) => new Promise<UserResponse>((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      const foundUser = MOCK_USERS.find((u) => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('cms_user', JSON.stringify(foundUser));
        resolve(foundUser);
      } else {
        reject('User not found!');
      }
    }, 1000);
  });

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cms_user');
    router.replace('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};