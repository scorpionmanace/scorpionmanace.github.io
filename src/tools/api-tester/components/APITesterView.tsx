"use client"

import React, { useState } from 'react';
import { Box, Button, Heading, Text, VStack, HStack, Input, Textarea } from '@chakra-ui/react';
import { useTheme } from '../../../contexts/ThemeContext';
import { usePxToRem } from '../../../core/hooks/usePxToRem';
import { useApiTester } from '../hooks/useApiTester';

const APITesterView: React.FC = () => {
  const {
    request,
    response,
    isLoading,
    error,
    updateRequest,
    addHeader,
    removeHeader,
    sendRequest
  } = useApiTester();

  const [newHeaderKey, setNewHeaderKey] = useState('');
  const [newHeaderValue, setNewHeaderValue] = useState('');
  const [authType, setAuthType] = useState('none');
  const [authValue, setAuthValue] = useState('');

  const { currentTheme } = useTheme();
  const { pxToRem } = usePxToRem();

  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

  const handleAddHeader = () => {
    if (newHeaderKey && newHeaderValue) {
      addHeader(newHeaderKey, newHeaderValue);
      setNewHeaderKey('');
      setNewHeaderValue('');
    }
  };

  const handleApplyAuth = () => {
    if (authValue) {
      const headerValue =
        authType === 'bearer' ? `Bearer ${authValue}` :
        authType === 'basic' ? `Basic ${btoa(authValue)}` : '';
      addHeader('Authorization', headerValue);
      setAuthValue('');
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return currentTheme === 'dark' ? 'green.400' : 'green.500';
    if (status >= 400) return currentTheme === 'dark' ? 'red.400' : 'red.500';
    return currentTheme === 'dark' ? 'yellow.400' : 'yellow.500';
  };

  const getStatusBg = (status: number) => {
    if (status >= 200 && status < 300) return currentTheme === 'dark' ? 'green.900' : 'green.100';
    if (status >= 400) return currentTheme === 'dark' ? 'red.900' : 'red.100';
    return currentTheme === 'dark' ? 'yellow.900' : 'yellow.100';
  };

  return (
    <Box maxW="75rem" mx="auto" px={{ base: 4, md: 8 }} py="2rem">
      <VStack gap="2rem">
        {/* Header */}
        <Box textAlign="center">
          <Heading size="2xl" mb={3} className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HTTP API Tester
          </Heading>
          <Text fontSize="lg" color={currentTheme === 'dark' ? "gray.400" : "gray.600"}>
            Test REST API endpoints with comprehensive request/response handling
          </Text>
        </Box>

        {/* Error Display */}
        {error && (
          <Box bg={currentTheme === 'dark' ? "red.900" : "red.100"} color={currentTheme === 'dark' ? "red.200" : "red.800"} p={4} borderRadius="lg" w="full">
            <Text fontWeight="bold">Error:</Text>
            <Text>{error}</Text>
          </Box>
        )}

        {/* Main Grid Layout */}
        <HStack gap="2rem" align="flex-start" w="full" flexWrap="wrap">
          {/* Request Section */}
          <Box flex="1" minW="25rem" bg={currentTheme === 'dark' ? "gray.800" : "white"} p="1.5rem" rounded="xl" shadow="lg">
            <Text fontSize="xl" fontWeight="bold" mb="1.5rem">Request Configuration</Text>

            {/* Method and URL */}
            <Box mb="1.5rem">
              <HStack mb="1rem">
                <select
                  value={request.method}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateRequest('method', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
                >
                  {methods.map((method: string) => (
                    <option
                      key={method}
                      value={method}
                      className="text-gray-900 dark:text-white"
                    >
                      {method}
                    </option>
                  ))}
                </select>
                <Input
                  type="url"
                  placeholder="https://api.example.com/endpoint"
                  value={request.url}
                  onChange={(e) => updateRequest('url', e.target.value)}
                  className="flex-1"
                />
              </HStack>
            </Box>

            {/* Headers */}
            <Box mb="1.5rem">
              <Text fontWeight="bold" mb="0.75rem">Headers</Text>
              <HStack mb={3}>
                <Input
                  placeholder="Header Key"
                  value={newHeaderKey}
                  onChange={(e) => setNewHeaderKey(e.target.value)}
                  flex={1}
                />
                <Input
                  placeholder="Header Value"
                  value={newHeaderValue}
                  onChange={(e) => setNewHeaderValue(e.target.value)}
                  flex={1}
                />
                <Button colorScheme="blue" onClick={handleAddHeader} size="sm">Add</Button>
              </HStack>

              <Box maxH="12.5rem" overflowY="auto">
                {Object.entries(request.headers).map(([key, value], idx) => (
                  <Box key={idx} display="flex" alignItems="center" justifyContent="space-between" py={2} px={3} bg={currentTheme === 'dark' ? "gray.700" : "gray.100"} rounded="md" mb={2}>
                    <Text fontFamily="mono" fontSize="sm">
                      <span className="font-bold">{key}:</span> {value}
                    </Text>
                    <Button
                      size="xs"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => removeHeader(key)}
                    >
                      ×
                    </Button>
                  </Box>
                ))}
                {Object.keys(request.headers).length === 0 && (
                  <Text color={currentTheme === 'dark' ? "gray.400" : "gray.500"} fontSize="sm" textAlign="center" py="1rem">No headers added</Text>
                )}
              </Box>
            </Box>

            {/* Authentication */}
            <Box mb="1.5rem">
              <Text fontWeight="bold" mb="0.75rem">Authentication</Text>
              <Box mb="0.75rem">
                <select
                  value={authType}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAuthType(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="none" className="text-gray-900 dark:text-white">None</option>
                  <option value="bearer" className="text-gray-900 dark:text-white">Bearer Token</option>
                  <option value="basic" className="text-gray-900 dark:text-white">Basic Auth</option>
                </select>
                {authType !== 'none' && (
                  <Box>
                    <Input
                      type={authType === 'basic' ? 'text' : 'password'}
                      placeholder={authType === 'bearer' ? 'Enter bearer token' : 'username:password'}
                      value={authValue}
                      onChange={(e) => setAuthValue(e.target.value)}
                      mb="0.5rem"
                    />
                    <Button colorScheme="purple" onClick={handleApplyAuth} size="sm" mb={2}>Apply Auth</Button>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Request Body */}
            {['POST', 'PUT', 'PATCH'].includes(request.method) && (
              <Box mb="1.5rem">
                <Text fontWeight="bold" mb="0.75rem">Request Body</Text>
                <Textarea
                  placeholder="Enter JSON, XML, or other body content"
                  value={request.body}
                  onChange={(e) => updateRequest('body', e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                />
              </Box>
            )}

            {/* Send Button */}
            <Box textAlign="right" mb={4}>
              <Button
                colorScheme="green"
                onClick={sendRequest}
                disabled={isLoading || !request.url}
                size="lg"
              >
                {isLoading ? 'Sending...' : 'Send Request'}
              </Button>
            </Box>
          </Box>

          {/* Response Section */}
          <Box flex="1" minW="25rem" bg={currentTheme === 'dark' ? "gray.800" : "white"} p="1.5rem" rounded="xl" shadow="lg">
            <Text fontSize="xl" fontWeight="bold" mb="1.5rem">Response</Text>

            {response ? (
              <VStack gap="1.5rem" align="stretch">
                {/* Status */}
                <Box textAlign="center">
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color={getStatusColor(response.status)}
                    className={`px-4 py-2 rounded-lg inline-block text-center`}
                    bg={getStatusBg(response.status)}
                  >
                    {response.status} {response.statusText}
                  </Text>
                </Box>

                {/* Headers */}
                <Box>
                  <Text fontWeight="bold" mb="0.75rem">Response Headers</Text>
                  <Box
                    maxH="12.5rem"
                    overflowY="auto"
                    bg={currentTheme === 'dark' ? "gray.700" : "gray.100"} p={4} rounded="lg"
                  >
                    <pre className="font-mono text-xs">
                      {Object.entries(response.headers)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join('\n')
                      }
                    </pre>
                  </Box>
                </Box>

                {/* Response Body */}
                <Box flex={1}>
                  <Text fontWeight="bold" mb="0.75rem">Response Body</Text>
                  <Box
                    bg={currentTheme === 'dark' ? "gray.700" : "gray.100"} p={4} rounded="lg"
                    maxH="25rem"
                    overflowY="auto"
                  >
                    <pre className="font-mono text-xs whitespace-pre-wrap break-all">
                      {response.body || 'No response body'}
                    </pre>
                  </Box>
                </Box>
              </VStack>
            ) : (
              <Box textAlign="center" py="4rem">
                <Text color={currentTheme === 'dark' ? "gray.400" : "gray.500"} fontSize="lg">
                  No response yet
                </Text>
                <Text color={currentTheme === 'dark' ? "gray.600" : "gray.400"} fontSize="sm">
                  Send a request to see the response
                </Text>
              </Box>
            )}
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default APITesterView;
