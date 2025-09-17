// Custom hook for keyboard shortcuts and platform detection
import { useCallback } from 'react';

export interface KeyboardShortcut {
  key: string;
  modifier: 'cmd' | 'ctrl';
  action: string;
  description: string;
}

export const useKeyboardShortcuts = () => {
  // Platform detection
  const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);
  const modifierKey = isMac ? 'Cmd' : 'Ctrl';

  // Platform-specific modifier key for event handling
  const getModifierPressed = (event: KeyboardEvent | React.KeyboardEvent<HTMLTextAreaElement>): boolean => {
    return isMac ? event.metaKey : event.ctrlKey;
  };

  // Format shortcuts
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'Enter',
      modifier: isMac ? 'cmd' : 'ctrl',
      action: 'format',
      description: `${modifierKey}+Enter: Format current tab`
    },
    {
      key: 'Enter',
      modifier: isMac ? 'cmd' : 'ctrl',
      action: 'run',
      description: `${modifierKey}+Shift+Enter: Run code`
    }
  ];

  // Keyboard event handler creator
  const createKeyboardHandler = (
    onFormat: () => void,
    onRun: () => void
  ) => {
    return useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const modifierPressed = getModifierPressed(event);
      const { key, shiftKey } = event;

      if (modifierPressed && key === 'Enter') {
        event.preventDefault();

        if (!shiftKey) {
          // Format current tab
          onFormat();
        } else {
          // Run code
          onRun();
        }
      }
    }, [onFormat, onRun]);
  };

  return {
    isMac,
    modifierKey,
    shortcuts,
    createKeyboardHandler,
    getModifierPressed
  };
};
