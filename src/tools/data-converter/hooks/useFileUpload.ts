import { useState, useCallback } from 'react';

export interface FileUploadState {
  isLoading: boolean;
  error: string;
}

export const useFileUpload = () => {
  const [fileUploadState, setFileUploadState] = useState<FileUploadState>({
    isLoading: false,
    error: '',
  });

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return null;

    setFileUploadState({ isLoading: true, error: '' });

    return new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileUploadState({ isLoading: false, error: '' });
        resolve(content);
      };
      reader.onerror = () => {
        setFileUploadState({ isLoading: false, error: 'Failed to read file' });
        resolve(null);
      };
      reader.readAsText(file);
    });
  }, []);

  const clearError = useCallback(() => {
    setFileUploadState(prev => ({ ...prev, error: '' }));
  }, []);

  return {
    ...fileUploadState,
    handleFileUpload,
    clearError,
  };
};
