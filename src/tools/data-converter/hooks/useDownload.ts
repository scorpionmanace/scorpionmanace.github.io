import { useCallback } from 'react';

export const useDownload = () => {
  const downloadFile = useCallback((content: string, conversionType: string) => {
    if (!content) return;

    let fileName = 'converted_data';
    let mimeType = 'text/plain';
    let fileExtension = 'txt';

    // Determine file type based on conversion
    switch (conversionType) {
      case 'json-to-csv':
        fileExtension = 'csv';
        mimeType = 'text/csv';
        fileName = 'converted_data';
        break;
      case 'json-to-xml':
        fileExtension = 'xml';
        mimeType = 'application/xml';
        fileName = 'converted_data';
        break;
      case 'csv-to-json':
        fileExtension = 'json';
        mimeType = 'application/json';
        fileName = 'converted_data';
        break;
      default:
        fileExtension = 'txt';
        mimeType = 'text/plain';
    }

    // Create blob and download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return { downloadFile };
};
