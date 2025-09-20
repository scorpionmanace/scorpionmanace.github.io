import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Card,
  CardBody,
  CardHeader,
  Button,
  Heading,
  Text,
  Textarea,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { useDataConverter } from '../hooks';

const DataConverterView: React.FC = () => {
  const {
    input,
    output,
    conversionType,
    error,
    isLoading,
    setInput,
    setConversionType,
    handleFileUpload,
    handleConvert,
    handleDownload,
  } = useDataConverter();

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      py={8}
    >
      <Container maxW="container.xl" py={8}>
        {/* Header Section */}
        <Card.Root mb={8} boxShadow="xl" borderRadius="lg">
          <CardHeader py={6} textAlign="center">
            <Box>
              <Flex justify="space-between" align="center" w="full" mb={4}>
                <Box>
                  <Link to="/tools">
                    <Button
                      bg="gray.600"
                      color="white"
                      px={6}
                      py={3}
                      borderRadius="full"
                      fontWeight="500"
                      _hover={{
                        bg: 'gray.700',
                        transform: 'translateY(-2px)',
                        shadow: 'lg'
                      }}
                      transition="all 0.3s ease"
                    >
                      <span style={{ fontSize: '1.2em', marginRight: '8px' }}>←</span>
                      Back to Tools
                    </Button>
                  </Link>
                </Box>
                <Box>
                  <Badge colorScheme="purple" fontSize="sm" px={3} py={1} borderRadius="full">
                    ⚡ Data Converter
                  </Badge>
                </Box>
              </Flex>

              <Box display="flex" flexDirection="column" gap={2}>
                <Heading
                  as="h1"
                  size="xl"
                  textAlign="center"
                  bgGradient="linear(135deg, #667eea 0%, #764ba2 100%)"
                  bgClip="text"
                >
                  🔄 Data Converter
                </Heading>
                <Text fontSize="lg" color="gray.600" textAlign="center">
                  Seamlessly convert between JSON, CSV, and XML formats
                </Text>
              </Box>
            </Box>
          </CardHeader>
        </Card.Root>

        {/* Main Content */}
        <Box display="flex" flexDirection="column" gap={6}>
          {/* File Upload and Conversion Settings */}
          <Flex
            direction={['column', 'row']}
            gap={6}
            w="full"
          >
            {/* File Upload */}
            <Card.Root flex={['1', '0.3']} boxShadow="lg" borderRadius="lg">
              <CardHeader>
                <Heading size="md" color="blue.600">
                  📁 File Upload
                </Heading>
              </CardHeader>
              <CardBody>
            <Box display="flex" flexDirection="column" gap={4}>
              <Box
                border="2px dashed"
                borderColor="gray.300"
                borderRadius="lg"
                p={6}
                textAlign="center"
                _hover={{ borderColor: 'blue.400' }}
                transition="all 0.3s ease"
                bg="gray.50"
              >
                    <input
                      type="file"
                      accept=".json,.csv,.xml"
                      onChange={handleFileUpload}
                      style={{
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        position: 'absolute',
                        cursor: 'pointer'
                      }}
                    />
                    <Box display="flex" flexDirection="column" gap={2}>
                      <Text fontSize="2xl">📎</Text>
                      <Text color="gray.600">Drop files here or click to browse</Text>
                      <Text fontSize="sm" color="gray.500">JSON, CSV, XML supported</Text>
                    </Box>
                  </Box>

                  {isLoading && (
                    <Flex align="center" justify="center" gap={2}>
                      <Text fontSize="sm" color="blue.600">Loading file...</Text>
                    </Flex>
                  )}
            </Box>
            </CardBody>
            </Card.Root>

            {/* Conversion Settings */}
            <Card.Root flex={['1', '0.7']} boxShadow="lg" borderRadius="lg">
              <CardHeader>
                <Heading size="md" color="green.600">
                  ⚙️ Settings
                </Heading>
              </CardHeader>
              <CardBody>
                <Box display="flex" flexDirection="column" gap={4}>
                  <Box w="full">
                    <Text mb={2} fontWeight="semibold">Conversion Type:</Text>
                    <select
                      value={conversionType}
                      onChange={(e) => setConversionType(e.target.value as any)}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        fontSize: '16px',
                        borderRadius: '12px',
                        border: '2px solid #e2e8f0',
                        backgroundColor: 'white',
                        fontFamily: 'monospace',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = '#667eea';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                      }}
                    >
                      <option value="json-to-csv">📊 JSON → CSV</option>
                      <option value="json-to-xml">📄 JSON → XML</option>
                      <option value="csv-to-json">🧠 CSV → JSON</option>
                    </select>
                  </Box>
                </Box>
              </CardBody>
            </Card.Root>
          </Flex>

          {/* Input/Output Section */}
          <Card.Root boxShadow="xl" borderRadius="lg">
            <CardBody py={6}>
              <Flex direction={['column', 'row']} gap={6}>
                {/* Input Section */}
                <Box flex={1}>
                  <Flex justify="space-between" align="center" mb={4}>
                    <Heading size="md" color="teal.600">
                      📥 Input Data
                    </Heading>
                    <Badge colorScheme="gray" fontSize="xs">
                      Input Format
                    </Badge>
                  </Flex>
                  <Textarea
                    placeholder={`Paste your data here...\n\nExample:\n[\n  {\"name\": \"John\", \"age\": 30},\n  {\"name\": \"Jane\", \"age\": 25}\n]`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    minH="350px"
                    resize="vertical"
                    fontFamily="monospace"
                    fontSize="sm"
                    border="2px solid"
                    borderColor="teal.100"
                    _focus={{
                      borderColor: 'teal.400',
                      boxShadow: '0 0 0 1px teal.400',
                      bg: 'teal.50'
                    }}
                    bg="gray.50"
                    borderRadius="lg"
                    _hover={{
                      borderColor: 'teal.200',
                      bg: 'teal.25'
                    }}
                    transition="all 0.3s ease"
                  />
                </Box>

                {/* Output Section */}
                <Box flex={1}>
                  <Flex justify="space-between" align="center" mb={4}>
                    <Heading size="md" color="purple.600">
                      📤 Output Data
                    </Heading>
                    <Badge colorScheme="gray" fontSize="xs">
                      Output Format
                    </Badge>
                  </Flex>
                  <Textarea
                    value={output}
                    readOnly
                    minH="350px"
                    placeholder="Converted data will appear here..."
                    fontFamily="monospace"
                    fontSize="sm"
                    border="2px solid"
                    borderColor="purple.100"
                    _focus={{
                      borderColor: 'purple.400',
                      boxShadow: '0 0 0 1px purple.400',
                      bg: 'purple.50'
                    }}
                    bg={output ? 'purple.50' : 'gray.50'}
                    borderRadius="lg"
                    transition="all 0.3s ease"
                  />
                </Box>
              </Flex>
            </CardBody>
          </Card.Root>

          {/* Error Messages */}
          {error && (
            <Card.Root boxShadow="lg" borderRadius="lg" bg="red.50" border="1px solid" borderColor="red.100">
              <CardBody>
                <Flex align="center" gap={3}>
                  <Text fontSize="lg">⚠️</Text>
                  <Text color="red.700" fontWeight="medium">{error}</Text>
                </Flex>
              </CardBody>
            </Card.Root>
          )}

          {/* Action Buttons */}
          <Card.Root boxShadow="xl" borderRadius="lg" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
            <CardBody py={6}>
              <Box display="flex" flexDirection="column" gap={4}>
                <Text color="white" fontSize="lg" textAlign="center" fontWeight="semibold">
                  Ready to convert your data?
                </Text>
                <Box display="flex" justifyContent="center" alignItems="center" gap={6}>
                  <Button
                    onClick={handleConvert}
                    size="lg"
                    bg="white"
                    color="blue.600"
                    px={10}
                    py={3}
                    borderRadius="full"
                    fontWeight="semibold"
                    shadow="xl"
                    _hover={{
                      bg: 'blue.50',
                      transform: 'translateY(-2px)',
                      shadow: '2xl'
                    }}
                    _active={{
                      transform: 'translateY(0px)',
                    }}
                    transition="all 0.3s ease"
                  >
                    ⚡ Convert Data
                  </Button>

                  {output && (
                    <Button
                      onClick={downloadOutput}
                      size="lg"
                      bg="green.500"
                      color="white"
                      px={10}
                      py={3}
                      borderRadius="full"
                      fontWeight="semibold"
                      shadow="xl"
                      _hover={{
                        bg: 'green.600',
                        transform: 'translateY(-2px)',
                        shadow: '2xl'
                      }}
                      _active={{
                        transform: 'translateY(0px)',
                      }}
                      transition="all 0.3s ease"
                    >
                      📥 Download File
                    </Button>
                  )}
                </Box>
              </Box>
            </CardBody>
          </Card.Root>
        </Box>
      </Container>
    </Box>
  );
};

export default DataConverterView;
