import { useCallback } from 'react';
import { useFileUpload } from './useFileUpload';
import { useDataConversion } from './useDataConversion';
import { useDownload } from './useDownload';

export const useDataConverter = () => {
  const fileUpload = useFileUpload();
  const conversion = useDataConversion();
  const { downloadFile } = useDownload();

  const handleFileUploadWrapper = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const content = await fileUpload.handleFileUpload(event);
    if (content) {
      conversion.setInput(content);

      // Auto-detect conversion type based on file extension
      const fileExtension = file.name.toLowerCase().split('.').pop() || '';
      const detectedType = conversion.autoDetectConversionType(fileExtension);
      conversion.setConversionType(detectedType);
    }
  }, [fileUpload, conversion]);

  const handleConvert = useCallback(() => {
    fileUpload.clearError(); // Clear any file upload errors
    return conversion.performConversion();
  }, [fileUpload, conversion]);

  const handleDownload = useCallback(() => {
    if (conversion.output) {
      downloadFile(conversion.output, conversion.conversionType);
    }
  }, [conversion.output, conversion.conversionType, downloadFile]);

  return {
    // Data conversion state
    input: conversion.input,
    output: conversion.output,
    conversionType: conversion.conversionType,
    error: conversion.error || fileUpload.error,

    // File upload state
    isLoading: fileUpload.isLoading,

    // Actions
    setInput: conversion.setInput,
    setConversionType: conversion.setConversionType,
    handleFileUpload: handleFileUploadWrapper,
    handleConvert,
    handleDownload,

    // Helpers
    clearError: () => {
      conversion.clearError();
      fileUpload.clearError();
    },
  };
};
