import { useState, useCallback } from 'react';
import { jsonToCsv, jsonToXml, csvToJson } from '../utils';

export interface DataConversionState {
  input: string;
  output: string;
  conversionType: string;
  error: string;
}

export type ConversionType = 'json-to-csv' | 'json-to-xml' | 'csv-to-json';

export const CONVERSION_OPTIONS = [
  { value: 'json-to-csv', label: '📊 JSON → CSV' },
  { value: 'json-to-xml', label: '📄 JSON → XML' },
  { value: 'csv-to-json', label: '🧠 CSV → JSON' },
] as const;

export const useDataConversion = () => {
  const [state, setState] = useState<DataConversionState>({
    input: '',
    output: '',
    conversionType: 'json-to-csv',
    error: '',
  });

  const setInput = useCallback((input: string) => {
    setState(prev => ({
      ...prev,
      input,
      error: '', // Clear error when input changes
      output: '', // Clear output when input changes
    }));
  }, []);

  const setConversionType = useCallback((conversionType: ConversionType) => {
    setState(prev => ({
      ...prev,
      conversionType,
      error: '', // Clear error when conversion type changes
    }));
  }, []);

  const autoDetectConversionType = useCallback((fileExtension: string): ConversionType => {
    switch (fileExtension.toLowerCase()) {
      case 'json':
        return 'json-to-csv';
      case 'csv':
        return 'csv-to-json';
      case 'xml':
        return 'json-to-csv'; // Default for XML
      default:
        return 'json-to-csv';
    }
  }, []);

  const performConversion = useCallback(() => {
    if (!state.input.trim()) {
      setState(prev => ({
        ...prev,
        error: 'Please enter some data to convert',
        output: '',
      }));
      return false;
    }

    try {
      let result = '';

      switch (state.conversionType) {
        case 'json-to-csv':
          const jsonData = JSON.parse(state.input);
          result = jsonToCsv(jsonData);
          break;
        case 'json-to-xml':
          const jsonDataXml = JSON.parse(state.input);
          result = jsonToXml(jsonDataXml);
          break;
        case 'csv-to-json':
          result = JSON.stringify(csvToJson(state.input), null, 2);
          break;
        default:
          throw new Error('Unsupported conversion type');
      }

      setState(prev => ({
        ...prev,
        output: result,
        error: '',
      }));
      return true;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Invalid format';
      setState(prev => ({
        ...prev,
        error: `Conversion failed: ${errorMessage}`,
        output: '',
      }));
      return false;
    }
  }, [state.input, state.conversionType]);

  const handleFileUpload = useCallback(async (fileUploadHandler: (event: React.ChangeEvent<HTMLInputElement>) => void) => {
    // This will be handled by the file upload hook
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: '' }));
  }, []);

  return {
    ...state,
    setInput,
    setConversionType,
    autoDetectConversionType,
    performConversion,
    clearError,
  };
};
