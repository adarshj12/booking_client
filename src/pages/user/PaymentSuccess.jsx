import { Box, Heading, Text,Button } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import {  useSearchParams,useNavigate } from 'react-router-dom'
export default function Success() {
    const [search,setSearch] = useSearchParams() 
    const searchQuery =useSearchParams()[0]
    console.log(searchQuery.get("reference"));
    const navigate = useNavigate()
    const refrence = searchQuery.get("reference");
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
       Booking Successful
      </Heading>
      <Text color={'gray.500'}>
      Reference Number : {refrence}
      </Text>
      <Button
        colorScheme="teal"
        mt={20}
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        onClick={()=>navigate('/')}
        >
        Go to Home
      </Button>
    </Box>
  );
}