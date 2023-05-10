import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/user/NavBar/NavBar'
export default function NotFound() {
  const navigate = useNavigate()
  return (
   <>
   <Navbar/>
    <Box textAlign="center" py={20} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>


      {!window.location.href.includes('admin') ?
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
          onClick={() => navigate('/')}
        >
          Go to Home
        </Button> :
        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
          onClick={() => navigate('/admin')}
        >
          Go to Home
        </Button>
      }
    </Box>
   </>
  );
}