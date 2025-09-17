// Custom hook for code formatting operations
import { useState, useCallback } from 'react';
import { formatCodeByLanguage, FormatResult } from './useCodeFormatters';
import { formatStatusMessage } from '../utils/statusMessages';

export const useCodeFormatting = () => {
  const [isFormatting, setIsFormatting] = useState(false);
  const [formatStatus, setFormatStatus] = useState<string | null>(null);

  const getLanguageName = (activeTab: string): string => {
    switch (activeTab) {
      case 'html': return 'HTML';
      case 'css': return 'CSS';
      case 'javascript': return 'JavaScript';
      default: return 'Code';
    }
  };

  const formatCurrentTab = useCallback(async (
    code: string,
    activeTab: 'html' | 'css' | 'javascript',
    setters: Record<'html' | 'css' | 'javascript', (value: string) => void>
  ): Promise<boolean> => {
    setIsFormatting(true);
    setFormatStatus(null);

    try {
      const languageName = getLanguageName(activeTab);

      if (!code.trim()) {
        return false; // No operation needed for empty code
      }

      const result: FormatResult = formatCodeByLanguage(code, activeTab);

      if (!result.changesMade) {
        // Code was already formatted
        setFormatStatus(`✅ ${languageName} code is already well formatted!`);
        return true; // Success - no changes needed
      }

      // Code was formatted successfully
      setters[activeTab](result.formatted);
      setFormatStatus(`✅ ${languageName} code formatted successfully!`);
      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Formatting failed';
      setFormatStatus(errorMessage);
      return false;
    } finally {
      setIsFormatting(false);
    }
  }, []);

  const clearFormatStatus = useCallback(() => {
    setFormatStatus(null);
  }, []);

  return {
    isFormatting,
    formatStatus,
    formatCurrentTab,
    clearFormatStatus
  };
};
