import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

interface BackButtonProps {
  to: string;
  text: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to, text }) => {
  return (
    <Link to={to}>
      <Button
        bg="#4a5568"
        color="white"
        px={{ base: 4, md: 6 }}
        py={{ base: 3, md: 4 }}
        borderRadius="md"
        fontSize={{ base: 'sm', md: 'md' }}
        fontWeight="500"
        _hover={{ bg: '#2d3748', transform: 'translateY(-2px)' }}
        transition="all 0.3s ease"
      >
        <span style={{ fontSize: '1.2em', marginRight: '4px' }}>←</span>
        {text}
      </Button>
    </Link>
  );
};

export default BackButton;
