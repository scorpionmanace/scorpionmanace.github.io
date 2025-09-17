// Reusable status message component
import React from 'react';
import { getConditionalMessageStyle } from '../utils/statusMessages';

interface StatusMessageProps {
  message: string | null;
  className?: string;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ message, className }) => {
  if (!message) return null;

  return (
    <div
      style={getConditionalMessageStyle(message)}
      className={className}
    >
      {message}
    </div>
  );
};

export default StatusMessage;
