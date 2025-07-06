import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import StatusMessage from '../components/StatusMessage';

type StatusType = 'success' | 'error' | 'info' | 'warning';

interface Status {
  id: string;
  message: string;
  type: StatusType;
}

interface StatusContextType {
  statuses: Status[];
  showStatus: (message: string, type?: StatusType) => void;
  removeStatus: (id: string) => void;
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export const useStatus = () => {
  const context = useContext(StatusContext);
  if (context === undefined) {
    throw new Error('useStatus must be used within a StatusProvider');
  }
  return context;
};

interface StatusProviderProps {
  children: ReactNode;
}

export const StatusProvider: React.FC<StatusProviderProps> = ({ children }) => {
  const [statuses, setStatuses] = useState<Status[]>([]);

  const showStatus = useCallback((message: string, type: StatusType = 'info') => {
    const id = Date.now().toString();
    const newStatus: Status = { message, type, id };
    
    setStatuses(prev => [...prev, newStatus]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setStatuses(prev => prev.filter(status => status.id !== id));
    }, 5000);
  }, []);

  const removeStatus = useCallback((id: string) => {
    setStatuses(prev => prev.filter(status => status.id !== id));
  }, []);

  return (
    <StatusContext.Provider value={{ statuses, showStatus, removeStatus }}>
      {children}
      {/* Status Messages */}
      {statuses.map(status => (
        <StatusMessage
          key={status.id}
          status={status}
          onRemove={removeStatus}
        />
      ))}
    </StatusContext.Provider>
  );
}; 