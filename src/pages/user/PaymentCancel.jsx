import { Box, Heading, Text ,Button} from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import {  useSearchParams,useNavigate } from 'react-router-dom'
export default function Warning() {
    const navigate = useNavigate()
  return (
    <Box textAlign="center" py={10} px={6}>
      <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        This is the headline
      </Heading>
      <Text color={'gray.500'}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
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