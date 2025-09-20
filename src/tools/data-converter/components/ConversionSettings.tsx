import React from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text
} from '@chakra-ui/react';
import { CONVERSION_OPTIONS } from '../hooks/useDataConversion';

interface ConversionSettingsProps {
  conversionType: string;
  onConversionTypeChange: (value: string) => void;
}

const ConversionSettings: React.FC<ConversionSettingsProps> = ({
  conversionType,
  onConversionTypeChange
}) => {
  return (
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
              onChange={(e) => onConversionTypeChange(e.target.value)}
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
              {CONVERSION_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Box>
        </Box>
      </CardBody>
    </Card.Root>
  );
};

export default ConversionSettings;
