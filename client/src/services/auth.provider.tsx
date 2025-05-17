import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../models/user.model';
import Cookies from 'universal-cookie';
import { userService } from './user.service';

const cookies = new Cookies();

interface AuthContextProps {
  user: Partial<any> | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Partial<any> | null>(null);

  useEffect(() => {
    const token = cookies.get('token');
    if (token) {
      const decodedUser = userService.decodeToken(token); // פענוח הטוקן
      const isTokenValid = userService.isTokenValid(token); // בדיקת תוקף הטוקן
      if (decodedUser && isTokenValid) {
        setUser(decodedUser);
      } else {
        cookies.remove('token'); // מחיקת הטוקן אם אינו תקף
        setUser(null);
      }
    }
  }, []);

  const login = (userData: User) => {
    cookies.set('token', userData.token);
    setUser(userData);
  };

  const logout = () => {
    cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
