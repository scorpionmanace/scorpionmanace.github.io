/**
 * Hook for code formatting functionality
 * Manages languages, state, and formatting operations
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import languagesData from '../../../../data/languages.json';

export interface Language {
  key: string;
  name: string;
  extension: string;
  sample: string;
  formatter: string;
}

export interface CodeFormatterState {
  selectedLanguage: Language | null;
  codeInput: string;
  formattedCode: string;
  isFormatting: boolean;
  error: string;
}

export const useCodeFormatter = () => {
  // Load languages data
  const languages: Language[] = useMemo(() => languagesData.languages, []);

  // Component state
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [codeInput, setCodeInput] = useState('');
  const [formattedCode, setFormattedCode] = useState('');
  const [isFormatting, setIsFormatting] = useState(false);
  const [error, setError] = useState('');

  // Initialize with first language
  useEffect(() => {
    if (languages.length > 0 && !selectedLanguage) {
      loadSample(languages[0]);
    }
  }, [languages]);

  // Format code based on selected language
  const formatCode = useCallback(async () => {
    if (!selectedLanguage) return;

    setIsFormatting(true);
    setError('');

    try {
      const formatted = await getFormatter(selectedLanguage, codeInput);
      setFormattedCode(formatted);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Formatting failed';
      setError(errorMessage);
      setFormattedCode(codeInput); // Fallback to original
    } finally {
      setIsFormatting(false);
    }
  }, [selectedLanguage, codeInput]);

  // Load sample code for a language
  const loadSample = useCallback((language: Language) => {
    setSelectedLanguage(language);
    setCodeInput(language.sample);
    setFormattedCode('');
    setError('');
  }, []);

  // Copy formatted code to clipboard
  const copyToClipboard = useCallback(async () => {
    try {
      const textToCopy = formattedCode || codeInput;
      await navigator.clipboard.writeText(textToCopy);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }, [formattedCode, codeInput]);

  // Get language by key
  const getLanguage = useCallback((key: string) => {
    return languages.find(lang => lang.key === key);
  }, [languages]);

  // Quick sample buttons (first 6 languages)
  const quickSamples = useMemo(() => languages.slice(0, 6), [languages]);

  return {
    // State
    languages,
    selectedLanguage,
    codeInput,
    formattedCode,
    isFormatting,
    error,

    // Actions
    setCodeInput,
    formatCode,
    loadSample,
    copyToClipboard,
    getLanguage,

    // Utilities
    quickSamples,
    canFormat: selectedLanguage && codeInput.trim().length > 0,
    canCopy: (formattedCode || codeInput).trim().length > 0
  };
};

// Code formatter functions
const getFormatter = async (language: Language, code: string): Promise<string> => {
  switch (language.formatter) {
    case 'javascript':
    case 'typescript':
      return formatJavaScriptTypeScript(code, language.formatter);

    case 'python':
      return formatPython(code);

    case 'java':
      return formatJava(code);

    case 'csharp':
      return formatCSharp(code);

    case 'cpp':
      return formatCpp(code);

    case 'go':
      return formatGo(code);

    case 'rust':
      return formatRust(code);

    case 'php':
      return formatPHP(code);

    case 'ruby':
      return formatRuby(code);

    case 'sql':
      return formatSQL(code);

    case 'json':
      return formatJSON(code);

    case 'css':
      return formatCSS(code);

    case 'html':
      return formatHTML(code);

    case 'xml':
      return formatXML(code);

    default:
      throw new Error(`Unsupported language: ${language.formatter}`);
  }
};

// JavaScript/TypeScript formatting
const formatJavaScriptTypeScript = async (code: string, type: 'javascript' | 'typescript'): Promise<string> => {
  try {
    // Basic indentation and spacing improvements
    let formatted = code;

    // Add consistent indentation (simplified)
    formatted = formatted.split('\n')
      .map((line, index, lines) => {
        const trimLine = line.trim();
        if (!trimLine) return '';

        let indentLevel = 0;
        for (let i = 0; i < lines.length && i < index; i++) {
          const prevTrim = lines[i].trim();
          if (prevTrim && (prevTrim.includes('{') || prevTrim.includes('(') && !prevTrim.includes(')'))) {
            indentLevel++;
          }
          if (prevTrim.includes('}') || prevTrim.includes(')') && !prevTrim.includes('(')) {
            indentLevel--;
          }
        }

        return '  '.repeat(Math.max(0, indentLevel)) + trimLine;
      })
      .join('\n');

    // Basic spacing around operators
    formatted = formatted
      .replace(/([^=!])=([^=])/g, '$1 = $2')  // Add space around =
      .replace(/([^=!])<([^<=])/g, '$1 < $2') // Add space around <
      .replace(/([^=!])>([^>=])/g, '$1 > $2') // Add space around >
      .replace(/([^=!])<=([^=])/g, '$1 <= $2') // Add space around <=
      .replace(/([^=!])>=([^=])/g, '$1 >= $2') // Add space around >=
      .replace(/([^=!])==([^=])/g, '$1 == $2') // Add space around ==
      .replace(/([^=!])!=([^=])/g, '$1 != $2') // Add space around !=

    // Clean up excessive whitespace
    formatted = formatted.split('\n')
      .map(line => line.trimRight())
      .join('\n');

    return formatted;
  } catch (error) {
    throw new Error('JavaScript/TypeScript formatting failed');
  }
};

// Python formatting
const formatPython = async (code: string): Promise<string> => {
  try {
    let formatted = code;

    // Ensure proper indentation (assume 4 spaces)
    formatted = formatted.split('\n')
      .map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '';

        // Simple logic to determine indentation level
        const indentLevel = Math.max(0, (line.length - line.trimLeft().length) / 4);

        return '    '.repeat(indentLevel) + trimmed;
      })
      .join('\n');

    // Clean up excessive blank lines
    formatted = formatted.replace(/\n\s*\n\s*\n/g, '\n\n');

    return formatted;
  } catch (error) {
    throw new Error('Python formatting failed');
  }
};

// Java formatting
const formatJava = async (code: string): Promise<string> => {
  try {
    let formatted = code;

    // Basic bracket spacing and indentation
    formatted = formatted.split('\n')
      .map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '';

        // Estimate indentation based on brackets
        let indentLevel = 0;
        // Simple bracket counting for indentation
        for (let i = 0; i < line.length; i++) {
          if (line.includes('{')) indentLevel++;
          else if (line.includes('}')) indentLevel--;
        }

        return '    '.repeat(Math.max(0, indentLevel)) + trimmed;
      })
      .join('\n');

    return formatted;
  } catch (error) {
    throw new Error('Java formatting failed');
  }
};

// Placeholder formatters for demonstration
const formatCSharp = async (code: string): Promise<string> => code;
const formatCpp = async (code: string): Promise<string> => code;
const formatGo = async (code: string): Promise<string> => code;
const formatRust = async (code: string): Promise<string> => code;
const formatPHP = async (code: string): Promise<string> => code;
const formatRuby = async (code: string): Promise<string> => code;
const formatSQL = async (code: string): Promise<string> => code;

// Working formatters
const formatJSON = async (code: string): Promise<string> => {
  try {
    const parsed = JSON.parse(code);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
};

const formatCSS = async (code: string): Promise<string> => {
  try {
    // CSS formatting
    let formatted = code;

    // Ensure consistent indentation for CSS rules
    formatted = formatted.split('\n')
      .map(line => {
        const trimmed = line.trim();
        if (trimmed === '' ||
            trimmed.includes('{') ||
            trimmed.includes('}') ||
            trimmed.includes('@media')) {
          return trimmed;
        }
        return '  ' + trimmed;
      })
      .join('\n')
      .replace(/\n\n\n+/g, '\n\n'); // Clean up excessive blank lines

    // Ensure consistent spacing around colons
    formatted = formatted.replace(/([^:]):([^])/g, '$1: $2');

    return formatted;
  } catch (error) {
    throw new Error('CSS formatting failed');
  }
};

const formatHTML = async (code: string): Promise<string> => code;
const formatXML = async (code: string): Promise<string> => code;
