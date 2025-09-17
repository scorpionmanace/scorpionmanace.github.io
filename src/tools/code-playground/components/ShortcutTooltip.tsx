// Reusable keyboard shortcuts tooltip component
import React, { useState, useEffect } from 'react';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

interface ShortcutTooltipProps {
  onClose?: () => void;
  className?: string;
}

export const ShortcutTooltip: React.FC<ShortcutTooltipProps> = ({ onClose, className }) => {
  const { shortcuts } = useKeyboardShortcuts();
  const [isVisible, setIsVisible] = useState(true);

  // Close when clicked outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!event.target || !(event.target as Element).closest('[data-tooltip]')) {
        setIsVisible(false);
        onClose?.();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      data-tooltip
      style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translate(-50%, 8px)',
        backgroundColor: '#374151',
        color: 'white',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 20,
        minWidth: '180px',
        textAlign: 'left'
      }}
      className={className}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#8b5cf6' }}>
        ⌨️ Keyboard Shortcuts
      </div>
      {shortcuts.map((shortcut, index) => (
        <div key={`${shortcut.action}-${index}`} style={{ marginBottom: '4px' }}>
          <strong style={{ color: '#10b981' }}>
            {shortcut.key === 'Enter' && !shortcut.description.includes('Shift')
              ? `${shortcut.modifier === 'cmd' ? 'Cmd' : 'Ctrl'}+Enter:`
              : `${shortcut.modifier === 'cmd' ? 'Cmd' : 'Ctrl'}+Shift+Enter:`
            }
          </strong> {shortcut.description.split(': ')[1]}
        </div>
      ))}
      <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px' }}>
        Click anywhere to close
      </div>

      {/* Arrow pointing up */}
      <div style={{
        position: 'absolute',
        top: '-6px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '0',
        height: '0',
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderBottom: '6px solid #374151'
      }}></div>
    </div>
  );
};

export default ShortcutTooltip;
