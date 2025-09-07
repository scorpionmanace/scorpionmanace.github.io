import React from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  Card,
  Badge,
  Spinner,
} from '@chakra-ui/react';

const ChakraUIDemo: React.FC = () => {
  return (
    <Box maxW="4xl" mx="auto" p={{ base: 4, md: 6 }}>
      <Heading
        size={{ base: 'xl', md: '2xl' }}
        textAlign="center"
        mb={{ base: 6, md: 8 }}
        color="gray.800"
        px={2}
      >
        🎨 Chakra UI + Tailwind CSS Demo
      </Heading>

      <Box
        bg="blue.50"
        borderLeft={4}
        borderColor="blue.500"
        p={{ base: 3, md: 4 }}
        mb={{ base: 6, md: 8 }}
        borderRadius="lg"
        mx={{ base: 2, md: 0 }}
      >
        <Text color="blue.700" fontSize={{ base: 'sm', md: 'md' }}>
          This demo showcases real Chakra UI components integrated with Tailwind CSS styling
        </Text>
      </Box>

      <VStack gap={{ base: 6, md: 8 }} px={{ base: 2, md: 0 }}>

        {/* Basic Components */}
        <Card.Root>
          <Card.Header px={{ base: 4, md: 6 }} py={{ base: 3, md: 4 }}>
            <Heading
              size={{ base: 'md', md: 'lg' }}
              color="gray.700"
            >
              Basic Components
            </Heading>
          </Card.Header>
          <Card.Body px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }}>
            <VStack gap={4}>
              <VStack gap={3} w="full">
                <Button
                  colorScheme="blue"
                  className="bg-blue-500 hover:bg-blue-600"
                  size={{ base: 'md', md: 'lg' }}
                  w={{ base: 'full', md: 'auto' }}
                >
                  Primary Button
                </Button>
                <Button
                  colorScheme="green"
                  className="bg-green-500 hover:bg-green-600"
                  size={{ base: 'md', md: 'lg' }}
                  w={{ base: 'full', md: 'auto' }}
                >
                  Success Button
                </Button>
                <Button
                  colorScheme="red"
                  className="bg-red-500 hover:bg-red-600"
                  size={{ base: 'md', md: 'lg' }}
                  w={{ base: 'full', md: 'auto' }}
                >
                  Danger Button
                </Button>
              </VStack>

              <input
                type="text"
                placeholder="Enter some text..."
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Form Elements */}
        <Card.Root>
          <Card.Header px={{ base: 4, md: 6 }} py={{ base: 3, md: 4 }}>
            <Heading
              size={{ base: 'md', md: 'lg' }}
              color="gray.700"
            >
              Form Elements
            </Heading>
          </Card.Header>
          <Card.Body px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }}>
            <VStack gap={4}>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <Text fontSize={{ base: 'md', md: 'lg' }}>
                  I agree to the terms and conditions
                </Text>
              </label>

              <Box>
                <Text
                  color="gray.700"
                  fontWeight="medium"
                  mb={3}
                  fontSize={{ base: 'md', md: 'lg' }}
                >
                  Choose an option:
                </Text>
                <VStack gap={2} alignItems="flex-start">
                  <label className="flex items-center gap-3 cursor-pointer w-full">
                    <input
                      type="radio"
                      name="radio-group"
                      value="option1"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <Text fontSize={{ base: 'md', md: 'lg' }}>Option A</Text>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer w-full">
                    <input
                      type="radio"
                      name="radio-group"
                      value="option2"
                      className="w-4 h-4 text-green-600 focus:ring-green-500"
                    />
                    <Text fontSize={{ base: 'md', md: 'lg' }}>Option B</Text>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer w-full">
                    <input
                      type="radio"
                      name="radio-group"
                      value="option3"
                      className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                    />
                    <Text fontSize={{ base: 'md', md: 'lg' }}>Option C</Text>
                  </label>
                </VStack>
              </Box>
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Status Indicators */}
        <Card.Root>
          <Card.Header px={{ base: 4, md: 6 }} py={{ base: 3, md: 4 }}>
            <Heading
              size={{ base: 'md', md: 'lg' }}
              color="gray.700"
            >
              Status Indicators
            </Heading>
          </Card.Header>
          <Card.Body px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }}>
            <VStack gap={4}>
              <HStack gap={{ base: 2, md: 4 }} wrap="wrap">
                <Badge
                  colorScheme="green"
                  px={{ base: 2, md: 3 }}
                  py={1}
                  borderRadius="full"
                  fontWeight="medium"
                  fontSize={{ base: 'xs', md: 'sm' }}
                >
                  Success
                </Badge>
                <Badge
                  colorScheme="yellow"
                  px={{ base: 2, md: 3 }}
                  py={1}
                  borderRadius="full"
                  fontWeight="medium"
                  fontSize={{ base: 'xs', md: 'sm' }}
                >
                  Warning
                </Badge>
                <Badge
                  colorScheme="red"
                  px={{ base: 2, md: 3 }}
                  py={1}
                  borderRadius="full"
                  fontWeight="medium"
                  fontSize={{ base: 'xs', md: 'sm' }}
                >
                  Error
                </Badge>
                <Badge
                  colorScheme="blue"
                  px={{ base: 2, md: 3 }}
                  py={1}
                  borderRadius="full"
                  fontWeight="medium"
                  fontSize={{ base: 'xs', md: 'sm' }}
                >
                  Info
                </Badge>
                <Badge
                  colorScheme="purple"
                  px={{ base: 2, md: 3 }}
                  py={1}
                  borderRadius="full"
                  fontWeight="medium"
                  fontSize={{ base: 'xs', md: 'sm' }}
                >
                  New
                </Badge>
              </HStack>

              <Box
                w="full"
                bg="gray.200"
                borderRadius="lg"
                h={4}
                className="bg-gradient-to-r from-green-500 to-blue-600"
                overflow="hidden"
              >
                <Box h={4} bg="blue.500" borderRadius="lg" w="75%" />
              </Box>

              <Flex
                align="center"
                justify="center"
                direction={{ base: 'column', md: 'row' }}
                gap={{ base: 2, md: 4 }}
              >
                <Spinner
                  size={{ base: 'md', md: 'lg' }}
                  color="blue.500"
                />
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  textAlign="center"
                >
                  Loading...
                </Text>
              </Flex>
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Integration Benefits */}
        <Box
          mt={{ base: 8, md: 12 }}
          textAlign="center"
          p={{ base: 4, md: 6 }}
          bg="linear-gradient(to right, #EBF8FF, #FAF5FF)"
          borderRadius="2xl"
          mx={{ base: 2, md: 0 }}
        >
          <Heading
            size={{ base: 'md', md: 'lg' }}
            mb={4}
            color="gray.700"
          >
            🚀 Seamless Integration
          </Heading>
          <Text
            fontSize={{ base: 'sm', md: 'lg' }}
            color="gray.600"
            maxW="2xl"
            mx="auto"
          >
            This demo shows how Chakra UI components can be integrated with Tailwind CSS classes
            for rapid UI development. Both approaches complement each other perfectly!
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default ChakraUIDemo;
