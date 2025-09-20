import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardHeader,
  Button,
  Heading,
  Text,
  Flex,
  Badge
} from '@chakra-ui/react';

interface DataConverterHeaderProps {
  onBack?: () => void;
}

const DataConverterHeader: React.FC<DataConverterHeaderProps> = ({ onBack }) => {
  return (
    <Card.Root mb={8} boxShadow="xl" borderRadius="lg">
      <CardHeader pb={6}>
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
  );
};

export default DataConverterHeader;
