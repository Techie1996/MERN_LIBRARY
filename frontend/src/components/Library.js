// components/Library.js

import React, { useState, useEffect } from 'react';
import { VStack, Heading, HStack, Button } from '@chakra-ui/react';
import MyBooks from './MyBooks';
import Google from './Google';
import Logout from './Authentication/Logout';
import AdminDashboard from './AdminDashboard'; // Import the AdminDashboard component
//import BookCard from './BookCard';

const Library = () => {
  const [activeComponent, setActiveComponent] = useState('MyBooks');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    const userIsAdmin = userData && userData.isAdmin; // Assuming the user info has the 'isAdmin' property

    setIsAdmin(userIsAdmin);
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const handleTransaction = async (bookId, transactionType) => {
    // Transaction logic
  };

  return (
    <VStack spacing="8" width="100%" maxW="1000px" marginX="auto" className="library-container">
      <HStack spacing="5">
        <Button
          colorScheme={activeComponent === 'MyBooks' ? 'blue' : 'gray'}
          onClick={() => handleButtonClick('MyBooks')}
        >
          My Books
        </Button>
        <Button
          colorScheme={activeComponent === 'Google' ? 'green' : 'gray'}
          onClick={() => handleButtonClick('Google')}
        >
          Google Books
        </Button>
        <Logout />
      </HStack>
      <Heading as="h1" size="xl" >
        {isAdmin ? 'Admin Dashboard' : ''}
      </Heading>
      {isAdmin ? (
        <AdminDashboard isAdmin={isAdmin} isEditable={true} />
      ) : (
        <>
          {activeComponent === 'MyBooks' && <MyBooks isEditable={true} onTransaction={handleTransaction} />}
          {activeComponent === 'Google' && <Google />}
        </>
      )}
      {isAdmin && (
        <>
          {/* Display the same content as in the library with editable availability status */}
          <MyBooks isAdmin={true} isEditable={true} onTransaction={handleTransaction} />
          {/* Conditionally render BookCard for admin users */}
          {/* You can add more components below if needed */}
        </>
      )}
    </VStack>
  );
};

export default Library;
