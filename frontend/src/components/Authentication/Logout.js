// src/authentication/Logout.js

import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Clear the authentication token (if stored locally)
      localStorage.removeItem('authToken');

      // Redirect to the login page after logout
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Button
      colorScheme="gray"
      bg="gray"
      _hover={{ bg: 'green.500' }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default Logout;
