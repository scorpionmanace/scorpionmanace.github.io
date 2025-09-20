import React from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  Card,
  CardBody,
  Flex
} from '@chakra-ui/react';

interface ActionButtonsProps {
  onConvert: () => void;
  onDownload: () => void;
  hasOutput: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onConvert,
  onDownload,
  hasOutput
}) => {
  return (
    <Card.Root boxShadow="xl" borderRadius="lg" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
      <CardBody py={6}>
        <Box display="flex" flexDirection="column" gap={4}>
          <Text color="white" fontSize="lg" textAlign="center" fontWeight="semibold">
            Ready to convert your data?
          </Text>
          <Flex justify="center" align="center" gap={6}>
            <Button
              onClick={onConvert}
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

            {hasOutput && (
              <Button
                onClick={onDownload}
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
          </Flex>
        </Box>
      </CardBody>
    </Card.Root>
  );
};

export default ActionButtons;
