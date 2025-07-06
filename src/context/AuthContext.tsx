import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  authModalOpen: boolean;
  authModalType: 'login' | 'register';
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
  openAuthModal: (type?: 'login' | 'register') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalType, setAuthModalType] = useState<'login' | 'register'>('login');

  const login = useCallback((email: string, password: string) => {
    // Mock login - in real app this would call an API
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      avatar: 'https://via.placeholder.com/40'
    };
    
    setCurrentUser(mockUser);
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    return Promise.resolve(mockUser);
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    // Mock registration - in real app this would call an API
    const mockUser: User = {
      id: '1',
      name: name,
      email: email,
      avatar: 'https://via.placeholder.com/40'
    };
    
    setCurrentUser(mockUser);
    setIsAuthenticated(true);
    setAuthModalOpen(false);
    return Promise.resolve(mockUser);
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  }, []);

  const openAuthModal = useCallback((type: 'login' | 'register' = 'login') => {
    setAuthModalType(type);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    currentUser,
    authModalOpen,
    authModalType,
    login,
    register,
    logout,
    openAuthModal,
    closeAuthModal
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 