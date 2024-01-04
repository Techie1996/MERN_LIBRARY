// BookCard.js

import React from 'react';
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  Button,
  Toast,
} from '@chakra-ui/react';

// components/BookCard.js

// ... (other imports and code)

const BookCard = ({ book, isAdmin, onAvailabilityChange, onTransaction }) => {
    const cardBgColor = useColorModeValue('white', 'gray.700'); // Define the cardBgColor
//const BookCard = ({ book, isAdmin, onAvailabilityChange, onTransaction }) => {
  const handleAvailabilityChange = async () => {
    try {
      const newAvailability =
        book?.availabilityStatus === 'Available' ? 'Not Available' : 'Available';

      // Make a request to your server to update the availability
      const response = await fetch(`/api/book/${book?.id}/updateAvailability`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availability: newAvailability }),
      });

      if (response.ok) {
        // Update the availability on the client side
        onAvailabilityChange(book?.id, newAvailability);
        showToast(`Availability for "${book?.volumeInfo?.title}" updated to ${newAvailability}`);
      } else {
        console.error('Failed to update availability');
        showToast('Failed to update availability');
      }
    } catch (error) {
      console.error('Error updating availability:', error);
      showToast('Error updating availability');
    }
  };


  const showToast = (message) => {
    Toast({
      title: message,
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box
      key={book?.id}
      p="3"
      borderWidth="1px"
      borderRadius="md"
      bg={cardBgColor}
      _hover={{ shadow: 'md' }}
    >
      <Heading as="h3" size="sm" mb="2" noOfLines={2}>
        {book?.volumeInfo?.title}
      </Heading>
      {book?.volumeInfo?.authors && (
        <Text fontSize="xs" color="gray.500" noOfLines={1}>
          Author(s): {book.volumeInfo.authors.join(', ')}
        </Text>
      )}
      {book?.volumeInfo?.description && (
        <Text fontSize="xs" color="gray.500" noOfLines={3}>
          {book?.volumeInfo?.description}
        </Text>
      )}
      {book?.availabilityStatus && (
        <Text fontSize="xs" color="green.500">
          Availability: {book?.availabilityStatus}
        </Text>
      )}

      {isAdmin && (
        <>
          <Button mt="2" size="sm" onClick={handleAvailabilityChange}>
            {book?.availabilityStatus === 'Available'
              ? 'Mark as Not Available'
              : 'Mark as Available'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default BookCard;
