import React, { useEffect, useState } from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import axios from '../../utils/axios'
import { otpLogin } from '../../utils/API';
import {
    AspectRatio,
    Button,
    Box,
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
import mobileimg from '../../assets/otp.jpg'
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import { authentication } from '../../firebase/firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/userSlice'
import toast, { Toaster } from "react-hot-toast";

const Mobile = () => {
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [flag, setFlag] = useState(false);
    const [username, setUsername] = useState();
    const [tokenVal, setTokenVal] = useState();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
            },
            defaultCountry: "IN"
        }, authentication);
    }


    const requestOTP = async () => {
        if (mobile === ''||mobile.length<10) toast.error('please enter mobile number');
        else {
            const phoneNumber = '+91' + mobile
            await axios.get(`${otpLogin}/${mobile}`, { headers: { "Content-Type": "application/json" } })
                .then((res) => {
                    if (res.status === 202) {
                        setFlag(true);
                        const decode = jwtDecode(res.data.token);
                        setUsername(decode.name);
                        setTokenVal(res.data.token);
                        generateRecaptcha();
                        let appVerifier = window.recaptchaVerifier
                        signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
                            .then((confirmationResult) => {
                                window.confirmationResult = confirmationResult;

                            }).catch((error) => {
                                toast.success(`error=> ${error.message}`);
                            });
                    } else {
                        toast.error('mobile not registered');
                    }
                })
        }

    }


    const verifyOTP = (otp) => {
        toast.success(otp);
        let confirmationResult = window.confirmationResult;
        confirmationResult.confirm(otp).then((result) => {
            const user = result.user;
            localStorage.setItem('userToken', tokenVal);
            dispatch(login({
                user: username,
                token: tokenVal
            }))
            navigate('/')
        }).catch((error) => {
            toast.success(`error=> ${error.message}`);
        });
    }

    const getOTP = () => {

        requestOTP(mobile);
    }

    return (
        <Container maxWidth='container.lg' padding={10}>
            <Flex direction={{ base: "column", md: "row" }} h={500} py={15}>

                <VStack
                    w='full'
                    h={{ base: "auto", md: 575 }}
                    p={10}
                    spacing={10}
                    align='flex-start'
                >
                    <AspectRatio ratio={1} w={400} h="full">
                        <Image src={mobileimg} />
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
                        <Heading>OTP Login</Heading>
                    </VStack>

                    <Stack spacing={5} width={350}>
                        <FormControl id="mobile" style={{ display: !flag ? 'block' : "none" }}>
                            <FormLabel>Mobile Number</FormLabel>
                            <Input
                                type="moble"
                                id='sign-in-button'
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />
                        </FormControl>
                        <Button width="full" style={{ display: !flag ? 'block' : "none" }}
                            onClick={getOTP} size="lg">Send OTP</Button>
                        <FormControl id="otp" style={{ display: flag ? 'block' : "none" }} >
                            <FormLabel>Enter OTP</FormLabel>
                            <Input
                                type="otp"
                                id='sign-in-button'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </FormControl>

                        <Button width="full" v style={{ display: flag ? 'block' : "none" }} onClick={() => verifyOTP(otp)}
                            size="lg">Submit</Button>

                        <Text fontSize="sm">
                            Sign in with password?{" "}
                            <Box as="span" color="blue.500">
                                <Link to='/login'>Click Here</Link>

                            </Box>
                        </Text>
                    </Stack>

                </VStack>
                <Toaster />
            </Flex>
        </Container>

    );
}

export default Mobile
