/**
 * Converts CSV string to JSON array of objects
 * @param csvString - CSV string to convert
 * @param hasHeader - Whether the first row contains headers (default: true)
 * @returns Array of JSON objects
 */
export function csvToJson(csvString: string, hasHeader: boolean = true): any[] {
  const lines = csvString.trim().split('\n');

  if (lines.length === 0) {
    return [];
  }

  // Parse CSV with proper comma escaping
  function parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    let i = 0;

    while (i < line.length) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
          // Escaped quote (double quote)
          current += '"';
          i += 2;
        } else {
          // Start or end of quoted field
          inQuotes = !inQuotes;
          i++;
        }
      } else if (char === ',' && !inQuotes) {
        // Field separator
        result.push(current);
        current = '';
        i++;
      } else {
        current += char;
        i++;
      }
    }

    // Add the last field
    result.push(current);

    return result;
  }

  const parsedLines = lines.map(line => parseCSVLine(line.trim()));

  if (!hasHeader) {
    // Generate numeric headers
    const numColumns = parsedLines[0]?.length || 0;
    const headers = Array.from({ length: numColumns }, (_, i) => `field_${i + 1}`);
    parsedLines.unshift(headers);
  }

  const headers = parsedLines[0];

  // Convert data rows to objects
  const dataRows = parsedLines.slice(1).filter(row => row.some(cell => cell.trim() !== ''));

  return dataRows.map(row => {
    const obj: any = {};
    headers.forEach((header, index) => {
      const cellValue = row[index] || '';
      obj[header] = guessDataType(cellValue);
    });
    return obj;
  });
}

/**
 * Attempts to convert string to appropriate data type
 * @param value - String value to convert
 * @returns Converted value (number, boolean, or string)
 */
function guessDataType(value: string): string | number | boolean | null {
  if (value === '' || value.toLowerCase() === 'null' || value.toLowerCase() === 'undefined') {
    return null;
  }

  // Try to parse as number
  const numValue = parseFloat(value);
  if (!isNaN(numValue) && value.toString() === numValue.toString()) {
    return numValue;
  }

  // Try to parse as boolean
  if (value.toLowerCase() === 'true') {
    return true;
  }
  if (value.toLowerCase() === 'false') {
    return false;
  }

  return value;
}
