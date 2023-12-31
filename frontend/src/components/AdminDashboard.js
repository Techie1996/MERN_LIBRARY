import React from 'react';
import { VStack, Text } from '@chakra-ui/react';

const AdminDashboard = ({ isAdmin, isEditable }) => {
  if (!isAdmin) {
    return (
      <VStack spacing="4" align="flex-start" width="100%" maxW="800px" marginX="auto">
        <Text fontSize="xl">You do not have access to the Admin Dashboard.</Text>
      </VStack>
    );
  }

  return (
<div></div>
  );
};

export default AdminDashboard;
