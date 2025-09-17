// Utility for status message types and styling
export interface StatusMessageConfig {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  icon: string;
}

export const getMessageType = (message: string): 'success' | 'warning' | 'error' => {
  if (message.includes('✅')) return 'success';
  if (message.includes('⚠️')) return 'warning';
  return 'error';
};

export const getMessageStyle = (messageType: 'success' | 'warning' | 'error'): StatusMessageConfig => {
  switch (messageType) {
    case 'success':
      return {
        backgroundColor: '#f0fdf4',
        borderColor: '#bbf7d0',
        textColor: '#166534',
        icon: '✅'
      };
    case 'warning':
      return {
        backgroundColor: '#fefae8',
        borderColor: '#fcd34d',
        textColor: '#d97706',
        icon: '⚠️'
      };
    case 'error':
      return {
        backgroundColor: '#fef2f2',
        borderColor: '#fecaca',
        textColor: '#dc2626',
        icon: '❌'
      };
  }
};

export const formatStatusMessage = (type: 'success' | 'error' | 'warning', content: string): string => {
  const icon = getMessageStyle(type).icon;
  return `${icon} ${content}`;
};

// Conditional styling logic
export const getConditionalMessageStyle = (message: string): React.CSSProperties => {
  const messageType = getMessageType(message);
  const config = getMessageStyle(messageType);

  return {
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '16px',
    fontSize: '14px',
    backgroundColor: config.backgroundColor,
    border: `1px solid ${config.borderColor}`,
    color: config.textColor
  };
};
