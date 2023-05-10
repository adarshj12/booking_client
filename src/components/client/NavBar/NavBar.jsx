// import { Box, Flex, Text, Spacer, Stack, Menu, MenuButton, MenuList, MenuItem, HStack } from "@chakra-ui/react";
// import { FaHome, FaUsers, FaUserAlt,FaRupeeSign } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// // import { logout } from '../../../redux/userSlice';
// import {client_logout} from '../../../redux/clientSlice';
// import {Link} from 'react-router-dom'
// import {status} from '../../../utils/API'
// import axios from '../../../utils/axios'
// import jwtDecode from "jwt-decode";
// import Swal from 'sweetalert2';
// const ClientNavbar=()=> {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const verificationStatus =async()=>{
//     try {
//       const token = localStorage.getItem('clientToken');
//       const decode = jwtDecode(token);
//       // console.log(decode);
//       await axios.get(`${status}/${decode.id}`, { headers: {  'Authorization': `Bearer ${token}` } }).then((res) => {
//           // console.log(res);
//           if(res.data.message) navigate('/client/property')
//           else{
//             Swal.fire({
//               icon: 'error',
//               title: 'You are not verified'
//             })
//           }
//       }).catch((err) => {
//           console.log(`error=> ${err.message}`)
//       })
//   } catch (err) {
//       console.log(`erroe => ${err.message}`)
//   }
//   }
  
//   let client = useSelector(state => state.client.user);
//   //  console.log(client);
//   const logoutClient=()=>{
//     localStorage.removeItem('clientToken');
//     dispatch(client_logout());
//     navigate('/');
//   }
//   return (
//     <Box boxShadow="sm" bg={'gray.400'} p="4">
//       <Flex alignItems="center">
//         <Text fontSize="2xl" fontWeight="bold">
//          <Link to='/client'> BookMyStay (Client)</Link>
//         </Text>

//         <Spacer />

//         <Stack direction="row" spacing="4">
//         <HStack> <FaHome /><Link onClick={()=>verificationStatus()}>Properties</Link></HStack>
//         <HStack><FaUsers /><Link to='/client/bookings'>Bookings</Link></HStack>
//         <HStack><FaRupeeSign /><Link to='/client/fianace'>Finance</Link></HStack>  
//         </Stack>

//         <Spacer />
//         <FaUserAlt />
//         <Menu>
//           <MenuButton as={Stack} direction="row" spacing="2" cursor="pointer">
           
//             <Text>Welcome {client} </Text>
//           </MenuButton>
//           <MenuList>
//             <MenuItem onClick={logoutClient}>Logout</MenuItem>
//           </MenuList>
//         </Menu>
//       </Flex>
//     </Box>
//   );
// }

// export default ClientNavbar;

import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {client_logout} from '../../../redux/clientSlice';
import logo from '../../../assets/booknstay_client.JPG'

export default function Simple() {
  let client = useSelector(state => state.client.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
    const logoutClient=()=>{
    localStorage.removeItem('clientToken');
    dispatch(client_logout());
    navigate('/');
  }

  return (
    <>
      <Box bg={'#3c7d5a'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box><Image h={10} src={logo} _hover={{ cursor: 'pointer' }} onClick={()=>navigate('/client')}></Image></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
            
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <Text color={'whiteAlpha.500'}>{client}</Text>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logoutClient}>logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

       
      </Box>
    </>
  );
}