import { useState, useCallback } from 'react';

interface UseJSONParserReturn {
  inputJSON: string;
  formattedJSON: string;
  error: string;
  setInputJSON: (value: string) => void;
  parseJSON: () => void;
  clearError: () => void;
  isValid: boolean;
}

export const useJSONParser = (): UseJSONParserReturn => {
  const [inputJSON, setInputJSON] = useState('');
  const [formattedJSON, setFormattedJSON] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  const clearError = useCallback(() => {
    setError('');
    setIsValid(true);
  }, []);

  const parseJSON = useCallback(() => {
    try {
      if (!inputJSON.trim()) {
        setError('Please enter some JSON data');
        setFormattedJSON('');
        setIsValid(false);
        return;
      }

      // Try to parse JSON (handles both stringified and regular JSON)
      const parsed = JSON.parse(inputJSON);
      // Format as beautified JSON
      setFormattedJSON(JSON.stringify(parsed, null, 2));
      setError('');
      setIsValid(true);
    } catch (err) {
      setError('Invalid JSON format');
      setFormattedJSON('');
      setIsValid(false);
    }
  }, [inputJSON]);

  return {
    inputJSON,
    formattedJSON,
    error,
    setInputJSON,
    parseJSON,
    clearError,
    isValid,
  };
};
