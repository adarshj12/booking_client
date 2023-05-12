import {
    Box,
    Container,
    Stack,
    Text,
    Image,
    Flex,
    Button,
    Heading,
    VStack,
    SimpleGrid,
    StackDivider,
    useColorModeValue,
    List,
    ListItem,
  } from '@chakra-ui/react';
  import { MdLocalShipping } from 'react-icons/md';
  import {useState,useEffect} from 'react'
  import UpdateModal from './UpdateUserModal'
  import {useLocation} from 'react-router-dom'
  import axios from '../../../utils/axios'
  import { GET_DETAIL_USER } from '../../../utils/API'
  import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';
import Mobile from './GAuthModal'
  export default function Simple() {
    const [flag,setFlag] =useState(false)
    const mobile = useSelector(state=>state.user.mobile);
    const [user,setUser]=useState('')
    const decode = jwtDecode(localStorage.getItem('userToken'));
    const getuser = async () => {
        const token = localStorage.getItem('userToken');
        await axios.get(`${GET_DETAIL_USER}/${decode.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
          setUser(res.data);
        }).catch((err) => {
          if (err.response.status === 403) {
            localStorage.removeItem('userToken')
            navigate('/login')
          }
          console.log(`error=> ${err.message}`)
        })
      }
    
      useEffect(() => {
        getuser();
        if(!mobile) setFlag(true)
      }, [])






    return (
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=600' }
              fit={'cover'}
              align={'center'}
              ml={20}
              w={'400px'}
              h={'500px'}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                Hello, {user?.username}
              </Heading>
             
            </Box>
  
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }>
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text
                  color={useColorModeValue('gray.500', 'gray.400')}
                  fontSize={'2xl'}
                  fontWeight={'300'}>
                  This is your profile Dashboard
                </Text>
                <Text fontSize={'lg'}>
                  From here you can edit your profile and visit your booking history and see payment and booking status.
                </Text>
              </VStack>
            </Stack>
           <UpdateModal user={user}/>
              {flag&&<Mobile/>}
  
           
          </Stack>
        </SimpleGrid>
      </Container>
    );
  }