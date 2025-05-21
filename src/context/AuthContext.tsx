import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check for existing session
    const checkSession = () => {
      const sessionUser = localStorage.getItem('user');
      if (sessionUser) {
        setUser(JSON.parse(sessionUser));
      }
      setIsLoading(false);
    };
    checkSession();
  }, []);
  const login = async (email: string, password: string) => {
    // Complete demo accounts matching LoginForm
    const demoAccounts = {
      'admin@lendology.com': {
        id: '1',
        name: 'Admin User',
        email: 'admin@lendology.com',
        role: 'admin',
        avatar: "/image.png"
      },
      'it@lendology.com': {
        id: '2',
        name: 'IT Support',
        email: 'it@lendology.com',
        role: 'it',
        avatar: "/image.png"
      },
      'member@lendology.com': {
        id: '3',
        name: 'Regular Member',
        email: 'member@lendology.com',
        role: 'member',
        avatar: "/image.png"
      },
      'accounting@lendology.com': {
        id: '4',
        name: 'Accounting Manager',
        email: 'accounting@lendology.com',
        role: 'accounting',
        avatar: "/image.png"
      },
      'hr@lendology.com': {
        id: '5',
        name: 'HR Manager',
        email: 'hr@lendology.com',
        role: 'hr',
        avatar: "/image.png"
      },
      'treasury@lendology.com': {
        id: '6',
        name: 'Treasury Manager',
        email: 'treasury@lendology.com',
        role: 'treasury',
        avatar: "/image.png"
      },
      'director@lendology.com': {
        id: '7',
        name: 'Director',
        email: 'director@lendology.com',
        role: 'director',
        avatar: "/image.png"
      }
    };
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const userAccount = demoAccounts[email as keyof typeof demoAccounts];
        if (userAccount) {
          setUser(userAccount);
          localStorage.setItem('user', JSON.stringify(userAccount));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // Simulate network delay
    });
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};