// Utility functions for API Tester

export const formatHeaders = (headers: Record<string, string>): string => {
  return Object.entries(headers)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
};

export const parseHeaders = (headerString: string): Record<string, string> => {
  const headers: Record<string, string> = {};
  headerString.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      headers[key.trim()] = valueParts.join(':').trim();
    }
  });
  return headers;
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
