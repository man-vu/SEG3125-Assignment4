import React from 'react';
import { X } from 'lucide-react';

interface Status {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface StatusMessageProps {
  status: Status;
  onRemove: (id: string) => void;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ status, onRemove }) => {
  const getStatusStyles = () => {
    switch (status.type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-400';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 border rounded-lg shadow-lg max-w-sm ${getStatusStyles()}`}>
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium">{status.message}</p>
        <button
          onClick={() => onRemove(status.id)}
          className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default StatusMessage; 