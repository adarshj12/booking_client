import React, { useState } from 'react'
import {
    Container,
    Flex,
    VStack,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Text,
    Stack,
    AspectRatio,
    Image,
    useBreakpointValue
} from "@chakra-ui/react";
import axios from '../../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import authimg from '../../assets/auth.jpg'
import { GOOGLE_AUTH, loginUser } from '../../utils/API';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/userSlice';
import jwtDecode from 'jwt-decode';
import { FaGoogle } from 'react-icons/fa';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { authentication } from '../../firebase/firebase';
import Swal from 'sweetalert2';
import toast, { Toaster } from "react-hot-toast";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const returnTo = useSelector(state => state.url.url)
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(email, password);
        const body = {
            email,
            password
        }
        await axios.post(loginUser, body, { headers: { "Content-Type": "application/json" } }).then((res) => {
            console.log(res);
            console.log(JSON.stringify(res));
            if (res.data.blocked) {
                Swal.fire({
                    icon: "error",
                    title: "You are blocked"
                })
            } else {
                if (res.status === 202) {
                    localStorage.setItem('userToken', res.data.token);
                    const decode = jwtDecode(res.data.token);
                    dispatch(login({
                        user: decode.name,
                        mobile: decode.mobile,
                        token: res.data.token
                    }))
                    navigate('/');
                    // navigate(returnTo);
                }
            }
        }).catch((err) => {
            console.log(err);
            toast.error(err.message)
        })
    };

    const signInWithGoogle = () => {
        console.log('google auth');
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
            .then(async (res) => {
                console.log(res);
                const body = {
                    name: res.user.displayName,
                    email: res.user.email,
                    password: res.user.uid
                }
                await axios.post(GOOGLE_AUTH, body).then((res) => {
                    if (res.data.blocked) {
                        toast.error('you are blocked')
                    } else {
                        if (res.status === 202) {
                            localStorage.setItem('userToken', res.data.token);
                            const decode = jwtDecode(res.data.token);
                            dispatch(login({
                                user: decode.name,
                                mobile: decode.mobile,
                                token: res.data.token
                            }))
                            navigate('/');
                        }
                    }
                })
                    .catch((err => {
                        toast.error(err.message)
                    }))

            })
            .catch((err => {
                console.log(`error=> ${err.message}`);
                toast.error(err.message)
            }))
    }
    const formWidth = useBreakpointValue({ base: "100%", md: "70%" });
    const imageWidth = useBreakpointValue({ base: "100%", md: "30%" });

    return (
        <Container maxWidth='container.lg' padding={10}>
            <Flex direction={{ base: "column", md: "row" }} h={575} py={15}>

                <VStack
                    w='full'
                   h={{ base: "auto", md: 575 }}
                    p={10}
                    spacing={10}
                    align='flex-start'
                >
                    <AspectRatio ratio={1} w={400} h="full">
                        <Image src={authimg} />
                    </AspectRatio>
                </VStack>

                <VStack
                    w='full'
                   h={{ base: "auto", md: 575 }}
                    p={8}
                    spacing={8}
                    align='flex-start'
                >
                    <VStack spacing={2} >
                        <Heading>Login</Heading>
                    </VStack>
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

                            <Button width="full" type='submit' colorScheme="blue"
                                size="lg">LOGIN</Button>

                            <Button width="full" onClick={signInWithGoogle}
                                colorScheme="red"
                                leftIcon={<FaGoogle />}
                                size="lg">Sign In With Gmail</Button>

                            <Text fontSize="sm">
                                Don't have an account?{" "}
                                <Box as="span" color="blue.500">
                                    <Link to='/register'>Register Here</Link>

                                </Box>
                            </Text>
                            <Text fontSize="sm" color='darkmagenta'>


                                <Link to='/mobile'>Sign in with mobile OTP ?</Link>

                            </Text>
                        </Stack>
                    </form>
                </VStack>
                <Toaster />            
            </Flex>
        </Container>

    );
}

export default Login
