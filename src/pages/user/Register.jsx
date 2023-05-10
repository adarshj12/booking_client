import React, { useState } from 'react'
import {
    AspectRatio,
    Button,
    Box,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Image,
    Input,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';
import axios from '../../utils/axios';
import { registerUser } from '../../utils/API';
import { Link, useNavigate } from 'react-router-dom';
import signup_img from '../../assets/reg.jpg'
import toast, { Toaster } from "react-hot-toast";
const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false)
    const [mobileError, setMobileError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [cpasswordError, setCPasswordError] = useState(false)
    const navigate = useNavigate();

    const handleNameChange = (value) => {
        if (!value.match(/^[a-zA-Z]{3,16}$/)) {
            setNameError(true)
        } else {
            setNameError(false)
            setUsername(value);
        }
    }

    const handleEmailChange = (value) => {
        if (!value.match(/^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)) {
            setEmailError(true)
        } else {
            setEmailError(false)
            setEmail(value);
        }
    }

    const handleMobileChange = (value) => {
        if (!value.match(/^\d{10}$/)) {
            setMobileError(true)
        } else {
            setMobileError(false)
            setMobile(value);
        }
    }

    const handlePasswordChange = (value) => {
        if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
            setPassword(value);
        }
    }

    const handleCPasswordChange = (value) => {
        if (value !== password) {
            setCPasswordError(true)
        } else {
            setCPasswordError(false)
            setConfirmPassword(value);
        }
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (nameError || emailError || mobileError || passwordError || cpasswordError || username === '' || email === '' || password === '' || mobile === '' || confirmPassword === '') {
            toast.error('form not completed')
        }else{
            console.log(username, email,mobile, password, confirmPassword);
        const body ={
            username, 
            email, 
            password,
            mobile
        }
        if(password!==confirmPassword) alert('password mismatch');
            await axios.post(registerUser,body,{ headers: { "Content-Type": "application/json" } }).then((res)=>{
                console.log(res);
                if(res.status===201) navigate('/login')
                else if(res.status ===203) toast.error(res.data.message)
            }).catch((err)=>{
                console.log(err.message);
                toast.error(err.message)
            }) 
        }
    };

    return (
        <Container maxWidth='container.lg' padding='10'>
            <Flex direction={{ base: "column", md: "row" }} h={570} py={15}>

                <VStack
                    w='full'
                    h={{ base: "auto", md: 575 }}
                    p={10}
                    spacing={10}
                    align='flex-start'
                >
                    <AspectRatio ratio={1} w={400} h="full">
                        <Image src={signup_img} />
                    </AspectRatio>
                </VStack>

                <VStack
                    w='full'
                    h={{ base: "auto", md: 575 }}
                    p={4}
                    spacing={8}
                    align='flex-start'
                >
                    <VStack spacing={2} >
                        <Heading>Registration</Heading>
                        {/* <HStack><Text>Already have an account?</Text>
                            <Link to='/login' style={{ color: 'green' }} > Click here to login in</Link>
                        </HStack> */}
                    </VStack>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3} width={350}>
                            <FormControl id="name">
                                <FormLabel>Full Name</FormLabel>
                                <Input
                                    type="text"
                                    onChange={(e) => handleNameChange(e.target.value)}
                                />
                                {nameError && <Text color={'red'}>Name should not be less than 3 characters and should only include alphabets</Text>}
                            </FormControl>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    onChange={(e) => handleEmailChange(e.target.value)}
                                />
                                {emailError && <Text color={'red'}>Invalid Email Format</Text>}
                            </FormControl>
                            <FormControl id="mobile">
                                <FormLabel>Mobile Number</FormLabel>
                                <Input
                                    type="text"
                                    onChange={(e) => handleMobileChange(e.target.value)}
                                />
                                {mobileError && <Text color={'red'}>Enter a valid Mobile Number excluding +91</Text>}
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    onChange={(e) => handlePasswordChange(e.target.value)}
                                />
                                {passwordError && <Text color={'red'}>Password should contain 8 to 15 characters with at least one lowercase letter, one uppercase letter, one numeric digit, and one special character</Text>}
                            </FormControl>
                            <FormControl id="confirmPassword">
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                    type="password"
                                    onChange={(e) => handleCPasswordChange(e.target.value)}
                                />
                            </FormControl>
                            {cpasswordError && <Text color={'red'}>Password and Confirm Password does not Match</Text>}
                            <Button width="full" color="green.400" type='submit'
                                size="lg">REGISTER</Button>
                            <Text fontSize="sm">
                                Already have an account?{" "}
                                <Box as="span" color="blue.500">
                                    <Link to='/login'> Log in here</Link>

                                </Box>
                            </Text>
                        </Stack>
                    </form>
                </VStack>
                <Toaster />
            </Flex>
        </Container>
    );
}

export default Register

