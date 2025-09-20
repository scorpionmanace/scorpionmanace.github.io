import React from 'react';
import {
  Card,
  CardBody,
  Text,
  Flex
} from '@chakra-ui/react';

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;

  return (
    <Card.Root boxShadow="lg" borderRadius="lg" bg="red.50" border="1px solid" borderColor="red.100">
      <CardBody>
        <Flex align="center" gap={3}>
          <Text fontSize="lg">⚠️</Text>
          <Text color="red.700" fontWeight="medium">{error}</Text>
        </Flex>
      </CardBody>
    </Card.Root>
  );
};

export default ErrorMessage;
