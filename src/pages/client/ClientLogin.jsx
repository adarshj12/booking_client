import React, { useState } from 'react'
import {
    AspectRatio,
    Button,
    Box,
    Grid,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Image,
    Input,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';

import { Link, useNavigate } from 'react-router-dom';
import axios from '../../utils/axios'
import { loginClient } from '../../utils/API';
import clientimg from '../../assets/clientreg.jpg'
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
// import { login } from '../../redux/userSlice';
import { client_login } from '../../redux/clientSlice';
import Swal from 'sweetalert2';
import toast, { Toaster } from "react-hot-toast";
const ClientLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email, password);
        console.log(email, password);
        const body = {
            email,
            password
        }
        axios.post(loginClient, body, { headers: { "Content-Type": "application/json" } }).then((res) => {
            // console.log(res);
            // console.log(res.data);
            // console.log(JSON.stringify(res));
            if (res.data.blocked) {
                Swal.fire({
                    icon: 'error',
                    title: 'You are Blocked'
                })
            } else {
                if (res.status === 202) {
                    localStorage.setItem('clientToken', res.data.token);
                    const decode = jwtDecode(res.data.token);
                    dispatch(client_login({
                        user: decode.name,
                        token: res.data.token
                    }))
                    navigate('/client');
                } else if (res.status === 403) {
                    toast.error(res.data.message);
                } else if (res.status === 404) {
                    toast.error(res.data.message);
                }
            }
        }).catch((err) => {
            console.log(err);
            toast.error(err.message);
        })
    };

    return (
        // <Container maxWidth='container.lg' padding={10}>
        //     <Flex direction={{ base: "column", md: "row" }} h={575} py={15}>

        //         <VStack
        //             w='full'
        //             h={{ base: "auto", md: 575 }}
        //             p={10}
        //             spacing={10}
        //             align='flex-start'
        //         >
        //             <AspectRatio ratio={1} w={400} h="full">
        //                 <Image src={clientimg} />
        //             </AspectRatio>
        //         </VStack>

        //         <VStack
        //             w='full'
        //             h={{ base: "auto", md: 575 }}
        //             p={8}
        //             spacing={8}
        //             align='flex-start'
        //         >
        //             <VStack spacing={2} >
        //                 <Heading>ClientLogin</Heading>
        //             </VStack>
        //             <form onSubmit={handleSubmit}>
        //                 <Stack spacing={5} width={350}>
        //                     <FormControl id="email">
        //                         <FormLabel>Email address</FormLabel>
        //                         <Input
        //                             type="email"
        //                             value={email}
        //                             onChange={(e) => setEmail(e.target.value)}
        //                             required
        //                         />
        //                     </FormControl>
        //                     <FormControl id="password">
        //                         <FormLabel>Password</FormLabel>
        //                         <Input
        //                             type="password"
        //                             value={password}
        //                             onChange={(e) => setPassword(e.target.value)}
        //                             required
        //                         />
        //                     </FormControl>

        //                     <Button width="full" type='submit'
        //                         size="lg">LOGIN</Button>

        //                     <Text fontSize="sm">
        //                         Don't have an account?{" "}
        //                         <Box as="span" color="blue.500">
        //                             <Link to='/clientregister'>Register Here</Link>

        //                         </Box>
        //                     </Text>
        //                     {/* <Text fontSize="sm" color='darkmagenta'>
        //                        <Link to='/mobile'>Sign in with mobile OTP ?</Link>
        //                     </Text> */}
        //                 </Stack>
        //             </form>
        //         </VStack>
        //         <Toaster />              
        //     </Flex>
        // </Container>
        <Box padding={10} display="flex" justifyContent="center" alignItems="center">
            <Grid
                templateColumns={{ base: "1fr", md: "400px 1fr" }}
                gap={10}
                minHeight="400px"
            >
                <Box>
                    <AspectRatio ratio={1}>
                        <Image src={clientimg} objectFit="cover" />
                    </AspectRatio>
                </Box>
                <Box>
                    <VStack align="flex-start" spacing={8}>
                        <Heading>ClientLogin</Heading>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={5} width={350}>
                                <FormControl id="email">
                                    <FormLabel>Email address</FormLabel>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </FormControl>
                                <Button width="full" type="submit" size="lg">
                                    LOGIN
                                </Button>
                                <Text fontSize="sm">
                                    Don't have an account?{" "}
                                    <Box as="span" color="blue.500">
                                        <Link to="/clientregister">Register Here</Link>
                                    </Box>
                                </Text>
                            </Stack>
                        </form>
                    </VStack>
                </Box>
                <Toaster />
            </Grid>
        </Box>


    );
}

export default ClientLogin;
