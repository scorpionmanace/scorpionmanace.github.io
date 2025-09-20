/**
 * Converts JSON array of objects to CSV format
 * @param jsonData - Array of objects to convert
 * @returns CSV string
 */
export function jsonToCsv(jsonData: any[]): string {
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    return '';
  }

  // Get all unique keys from all objects
  const headers = Array.from(new Set(jsonData.flatMap(obj => Object.keys(obj))));

  // Create CSV header row
  const headerRow = headers.join(',');

  // Create CSV data rows
  const rows = jsonData.map(obj => {
    return headers.map(header => {
      const value = obj[header];
      // Handle different data types and escape commas and quotes
      if (value === null || value === undefined) {
        return '';
      }

      const stringValue = String(value);
      // If value contains comma, quote, or newline, wrap in quotes and escape quotes
      if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }

      return stringValue;
    }).join(',');
  });

  return [headerRow, ...rows].join('\n');
}
