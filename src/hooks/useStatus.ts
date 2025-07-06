import { useState, useCallback } from 'react';

type StatusType = 'success' | 'error' | 'info' | 'warning';

interface Status {
  message: string;
  type: StatusType;
  id: string;
}

export const useStatus = () => {
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

  return {
    statuses,
    showStatus,
    removeStatus
  };
}; 