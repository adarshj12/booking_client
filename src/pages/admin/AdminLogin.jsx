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
    Image,
    Input,
    Stack,
    Text,
    VStack
} from '@chakra-ui/react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios, { adminInstance } from '../../utils/axios'
import { adminLogin } from '../../utils/API';
import admImage from '../../assets/admin.jpg'
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import toast, { Toaster } from "react-hot-toast";
// import { login } from '../../redux/userSlice';
import { loginAdmin } from '../../redux/adminSlice'; 
const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const location = useLocation();
    // console.log(location);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(email,password);
        const body = {
            email,
            password
        }
        try {
            await adminInstance.post(adminLogin, body, { headers: { "Content-Type": "application/json" } }).then((res) => {
                console.log(res);
                // console.log(JSON.stringify(res));
                if (res.status === 202) {
                    console.log('rtdyytftfutu');
                    localStorage.setItem('adminToken', res.data.token);
                    const decode = jwtDecode(res.data.token);
                    console.log(decode);
                    dispatch(loginAdmin({
                        user: decode.name,
                        token: res.data.token
                    }))
                    toast.success(res.data.message);;
                    navigate('/admin/adminDashboard');
                }
            }).catch((err) => {
                console.log(err);
                toast.error(err.message);
            })
        } catch (error) {
            console.log(`error=> ${error.message}`);
            alert(error.message);
        }
    };

  return (
    
        <Container maxWidth='container.lg' padding={10}>
            <Flex h={500} py={15}>

                <VStack
                    w='full'
                    h='full'
                    p={10}
                    spacing={10}
                    align='flex-start'
                >
                    <AspectRatio ratio={1} w={400} h="full">
                        <Image src={admImage} />
                    </AspectRatio>
                </VStack>

                <VStack
                    w='full'
                    h='full'
                    p={10}
                    spacing={8}
                    marginTop={18}
                    align='flex-start'
                >
                    <VStack  >
                        <Heading>ADMIN LOGIN</Heading>
                    </VStack>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={5} width={350}>
                            <FormControl id="email">
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
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
                            <Button width="full" bg={'blue.600'} type='submit'
                                size="lg">LOGIN</Button>
                                
                           
                        </Stack>
                    </form>
                </VStack>
                <Toaster />
            </Flex>
        </Container>
  )
}

export default AdminLogin;
