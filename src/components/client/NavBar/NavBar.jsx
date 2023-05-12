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