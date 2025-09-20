import { useState } from 'react';

export interface APIRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
}

export interface APIResponse {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
}

export const useApiTester = () => {
  const [request, setRequest] = useState<APIRequest>({
    method: 'GET',
    url: '',
    headers: {},
    body: ''
  });
  const [response, setResponse] = useState<APIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const updateRequest = (key: keyof APIRequest, value: any) => {
    setRequest(prev => ({ ...prev, [key]: value }));
  };

  const addHeader = (key: string, value: string) => {
    setRequest(prev => ({
      ...prev,
      headers: { ...prev.headers, [key]: value }
    }));
  };

  const removeHeader = (key: string) => {
    setRequest(prev => {
      const newHeaders = { ...prev.headers };
      delete newHeaders[key];
      return { ...prev, headers: newHeaders };
    });
  };

  const sendRequest = async () => {
    if (!request.url) {
      setError('URL is required');
      return;
    }

    setIsLoading(true);
    setError('');
    setResponse(null);

    try {
      const fetchOptions: RequestInit = {
        method: request.method,
        headers: request.headers,
        ...(request.method !== 'GET' && request.method !== 'HEAD' && request.body && {
          body: request.body
        })
      };

      const apiResponse = await fetch(request.url, fetchOptions);
      const responseText = await apiResponse.text();
      const responseHeaders: Record<string, string> = {};
      apiResponse.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      setResponse({
        status: apiResponse.status,
        statusText: apiResponse.statusText,
        headers: responseHeaders,
        body: responseText
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    request,
    response,
    isLoading,
    error,
    updateRequest,
    addHeader,
    removeHeader,
    sendRequest
  };
};
