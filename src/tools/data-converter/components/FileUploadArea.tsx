import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Flex
} from '@chakra-ui/react';

interface FileUploadAreaProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ onFileUpload, isLoading }) => {
  return (
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
            position="relative"
          >
            <input
              type="file"
              accept=".json,.csv,.xml"
              onChange={onFileUpload}
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
  );
};

export default FileUploadArea;
