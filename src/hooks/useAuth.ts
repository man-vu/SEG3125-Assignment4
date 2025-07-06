import { useState, useCallback } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export const useAuth = () => {
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

  return {
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
}; 