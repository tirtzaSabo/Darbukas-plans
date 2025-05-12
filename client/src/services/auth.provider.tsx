import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../models/user.model';
import Cookies from 'universal-cookie';
import { userService } from './user.service';

const cookies = new Cookies();


interface AuthContextProps {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // async function fetchUser() {
  //   try {
  //     const storedUser = await userService.getStoredUser();
  //     if (storedUser) {
  //       setUser(storedUser);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user:", error);
  //   }
  // }
  // async function fetchUser() {
  //   try {
  //      const storedUser =//cookies.get("user")
  //     await userService.getStoredUser(cookies.get("token"));
  //     if (storedUser) {
  //       setUser(storedUser);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user:", error);
  //   }
  // }
  // useEffect( () => {    
  //   const token = cookies.get('token');
  //   if (token) {
  //     userService.getStoredUser(token).then((userData) => {
  //           if (userData) setUser(userData);
  //           else cookies.remove('token'); // הסר טוקן לא תקין
  //       });
  //   }  }, []);
  useEffect(() => {
    const checkTokenAndFetchUser = async () => {
        const token = cookies.get('token');
        if (token) {
            try {
                const userData = await userService.getStoredUser(token);
                if (userData) {
                    setUser(userData);
                } else {
                    cookies.remove('token'); // הסר טוקן לא תקין
                }
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        }
    };

    checkTokenAndFetchUser();
}, []);

  const login = (userData: User) => {
    cookies.set("token",userData.token)
    setUser(userData);
  };

  const logout = () => {
    cookies.remove("token");
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
