import { Box, Center, Text, Button, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/user/NavBar/NavBar'
import error from '../assets/server.jpg'
export default function Error() {
    const navigate = useNavigate()
    return (
        <>
            <Navbar />
            <Box textAlign="center" py={15} px={6}>
                <Center>
                    <Image h={400} w={400} src={error} />

                </Center>
                <Text color={'gray.500'} mb={6}>
                    Oops Something Went Wrong
                </Text>

                <Button
                    colorScheme="teal"
                    bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                    color="white"
                    variant="solid"
                    onClick={() => navigate('/')}
                >
                    Go to Home
                </Button>
            </Box>
        </>
    );
}