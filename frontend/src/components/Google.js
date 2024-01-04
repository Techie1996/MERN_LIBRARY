import React, { useState, useEffect } from 'react';
import { VStack, Heading, Input, Button, SimpleGrid, Box, Text } from '@chakra-ui/react';
import axios from 'axios';


const Google = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulating a delay to mimic the loading process
  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(delay);
  }, []);

  const fetchBooks = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/book/fetch?searchTerm=${query}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks('JavaScript');
  }, []);

  const handleSearch = () => {
    fetchBooks(searchTerm);
  };
  
  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      handleSearch();
    }
  } 
  return (
    <VStack spacing="5" color="black" width="100%" maxW="800px" marginX="auto">
      {/* <Heading as="h1" size="xl">
        Library
      </Heading> */}
      <Input
        placeholder="Search for books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <Button colorScheme="blue" onClick={handleSearch}>
        Search
      </Button>
      {loading ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
          {[...Array(6)].map((_, index) => (
            <Box key={index} p="3" borderWidth="1px" borderRadius="md" opacity="0.5">
              <Heading as="h3" size="sm" mb="2" noOfLines={2}>
                Loading...
              </Heading>
              <Text fontSize="xs" color="gray.500" noOfLines={1}>
                Author(s): Loading...
              </Text>
              <Text fontSize="xs" color="gray.500" noOfLines={3}>
                Loading...
              </Text>
              <Text fontSize="xs" color="green.500">
                Availability: Loading...
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        books.length > 0 && (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
            {books.slice(0, 6).map((book) => (
              <Box key={book.id} p="3" borderWidth="1px" borderRadius="md">
                <Heading as="h3" size="sm" mb="2" noOfLines={2}>
                  {book.volumeInfo.title}
                </Heading>
                {book.volumeInfo.authors && (
                  <Text fontSize="xs" color="gray.500" noOfLines={1}>
                    Author(s): {book.volumeInfo.authors.join(', ')}
                  </Text>
                )}
                {book.volumeInfo.description && (
                  <Text fontSize="xs" color="gray.500" noOfLines={3}>
                    {book.volumeInfo.description}
                  </Text>
                )}
                {book.availabilityStatus && (
                  <Text fontSize="xs" color="green.500">
                    Availability: {book.availabilityStatus}
                  </Text>
                )}
              </Box>
            ))}
          </SimpleGrid>
        )
      )}
    </VStack>
  );
};

export default Google;
