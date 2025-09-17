// Custom hook for code formatting utilities
export interface FormatResult {
  formatted: string;
  changesMade: boolean;
}

// Individual language formatters
export const formatHTMLCode = (code: string): FormatResult => {
  try {
    // HTML formatting logic
    let formatted = code
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n');

    // Add indentation for nested elements
    formatted = formatted
      .replace(/(<[^/][^>]*>)/g, '\n$1')
      .replace(/(<\/[^>]*>)/g, '$1\n')
      .split('\n')
      .map((line, index, lines) => {
        const trimmed = line.trim();
        if (!trimmed) return '';

        let indent = 0;
        for (let i = 0; i < index; i++) {
          const prev = lines[i];
          if (prev.includes('<') && !prev.includes('/>') && !prev.includes('</')) indent++;
          if (prev.includes('</') || prev.endsWith('/>')) indent = Math.max(0, indent - 1);
        }

        return '  '.repeat(indent) + trimmed;
      })
      .join('\n');

    return {
      formatted,
      changesMade: formatted !== code
    };
  } catch (error) {
    throw new Error('HTML formatting failed');
  }
};

export const formatCSSCode = (code: string): FormatResult => {
  try {
    // CSS formatting logic
    let formatted = code
      .split('\n')
      .map(line => {
        const trimmed = line.trim();
        if (trimmed === '' || trimmed.includes('{') || trimmed.includes('}') || trimmed.includes('@media')) {
          return trimmed;
        }
        return '  ' + trimmed;
      })
      .join('\n')
      .replace(/\n\n\n+/g, '\n\n');

    // Consistent spacing around colons
    formatted = formatted.replace(/([^:]):([^])/g, '$1: $2');

    return {
      formatted,
      changesMade: formatted !== code
    };
  } catch (error) {
    throw new Error('CSS formatting failed');
  }
};

export const formatJSCode = (code: string): FormatResult => {
  try {
    // JavaScript formatting logic
    let formatted = code
      .split('\n')
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

    // Operator spacing
    formatted = formatted
      .replace(/([^=!])=([^=])/g, '$1 = $2')
      .replace(/([^=!])<([^<=])/g, '$1 < $2')
      .replace(/([^=!])>([^>=])/g, '$1 > $2')
      .replace(/([^=!])<=([^=])/g, '$1 <= $2')
      .replace(/([^=!])>=([^=])/g, '$1 >= $2')
      .replace(/([^=!])==([^=])/g, '$1 == $2')
      .replace(/([^=!])!=([^=])/g, '$1 != $2');

    // Clean whitespace
    formatted = formatted.split('\n')
      .map(line => line.trimRight())
      .join('\n');

    return {
      formatted,
      changesMade: formatted !== code
    };
  } catch (error) {
    throw new Error('JavaScript formatting failed');
  }
};

// Main formatting function that routes to the appropriate formatter
export const formatCodeByLanguage = (code: string, language: 'html' | 'css' | 'javascript'): FormatResult => {
  switch (language) {
    case 'html':
      return formatHTMLCode(code);
    case 'css':
      return formatCSSCode(code);
    case 'javascript':
      return formatJSCode(code);
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
};
