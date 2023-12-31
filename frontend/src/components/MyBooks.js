import React, { useState, useEffect } from 'react';
import {
  VStack,
  Heading,
  Input,
  Button,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import BookCard from './BookCard'; // Import the BookCard component
import axios from 'axios';

const MyBooks = ({ isAdmin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const toast = useToast();

  const fetchBooks = async (query) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/book/my-books?searchTerm=${query}`);
      const data = response.data;
      console.log('Fetched data:', data); // Log the fetched data to see what you're getting
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      showToast('Error fetching books');
    }
  };

  useEffect(() => {
    // Set initial state to all books when the component mounts
    fetchBooks('');
  });

  const handleSearch = () => {
    fetchBooks(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAvailabilityChange = (bookId, newAvailability) => {
    // Update the availability status of the book with the given bookId
    const updatedBooks = books.map((book) =>
      book.id === bookId ? { ...book, availabilityStatus: newAvailability } : book
    );

    // Update the state with the modified books array
    setBooks(updatedBooks);
  };

  const showToast = (message) => {
    toast({
      title: message,
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  const textColor = useColorModeValue('black', 'white');

  return (
    <VStack spacing="5" color={textColor} width="100%" maxW="800px" marginX="auto">
      <Heading as="h1" size="xl">
        Library
      </Heading>
      <Input
        placeholder="Search for books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Button colorScheme="blue" onClick={handleSearch}>
        Search
      </Button>
      {books.length > 0 ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isAdmin={isAdmin}
              onAvailabilityChange={isAdmin ? handleAvailabilityChange : undefined}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text>No books found</Text>
      )}
    </VStack>
  );
};

export default MyBooks;
