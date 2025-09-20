/**
 * Converts JSON to XML format
 * @param jsonData - JSON data to convert
 * @param rootElement - Root element name (default: 'data')
 * @returns XML string
 */
export function jsonToXml(jsonData: any, rootElement: string = 'data'): string {
  function convertJsonToXml(obj: any, elementName: string = 'item'): string {
    if (obj === null || obj === undefined) {
      return `<${elementName}></${elementName}>`;
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
      return `<${elementName}>${escapeXml(String(obj))}</${elementName}>`;
    }

    if (Array.isArray(obj)) {
      const items = obj.map((item, index) =>
        convertJsonToXml(item, singularize(elementName))
      );
      return `<${elementName}>${items.join('')}</${elementName}>`;
    }

    if (typeof obj === 'object') {
      const children = Object.keys(obj).map(key => {
        const value = obj[key];
        const childName = key.replace(/[^a-zA-Z0-9]/g, '_');
        return convertJsonToXml(value, childName);
      });
      return `<${elementName}>${children.join('')}</${elementName}>`;
    }

    return `<${elementName}></${elementName}>`;
  }

  function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '<';
        case '>': return '>';
        case '&': return '&';
        case "'": return '&#39;';
        case '"': return '"';
        default: return c;
      }
    });
  }

  function singularize(word: string): string {
    if (word.endsWith('ies')) {
      return word.slice(0, -3) + 'y';
    }
    if (word.endsWith('s') && word !== 's') {
      return word.slice(0, -1);
    }
    return word;
  }

  // Add XML declaration
  const xmlContent = convertJsonToXml(jsonData, rootElement);
  return `<?xml version="1.0" encoding="UTF-8"?>\n${xmlContent}`;
}
