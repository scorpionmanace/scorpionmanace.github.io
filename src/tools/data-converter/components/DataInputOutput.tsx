import React from 'react';
import {
  Box,
  Text,
  Textarea,
  Flex,
  Badge
} from '@chakra-ui/react';

interface DataInputOutputProps {
  input: string;
  output: string;
  onInputChange: (value: string) => void;
}

const DataInputOutput: React.FC<DataInputOutputProps> = ({
  input,
  output,
  onInputChange
}) => {
  return (
    <Box display="flex" direction={['column', 'row']} gap={6}>
      {/* Input Section */}
      <Box flex={1}>
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontWeight="bold" color="teal.600">
            📥 Input Data
          </Text>
          <Badge colorScheme="gray" fontSize="xs">
            Input Format
          </Badge>
        </Flex>
        <Textarea
          placeholder={`Paste your data here...\n\nExample:\n[\n  {\"name\": \"John\", \"age\": 30},\n  {\"name\": \"Jane\", \"age\": 25}\n]`}
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
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
          <Text fontWeight="bold" color="purple.600">
            📤 Output Data
          </Text>
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
    </Box>
  );
};

export default DataInputOutput;
