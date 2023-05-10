import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Flex, Grid, FormControl, FormLabel, Input, ListItem, Button, Text, useColorModeValue,
  VisuallyHidden, List, SimpleGrid,
  StackDivider, VStack, Image, Container, AspectRatio, Stack, Heading, HStack
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { GET_USER_BOOKING } from '../../../utils/API'
import axios from '../../../utils/axios'
import jwtDecode from "jwt-decode";
import Swal from 'sweetalert2';

const SingleProperty = () => {
  const [detail, setDetail] = useState('')
  const [rooms,setRooms] = useState()
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);

  const token = localStorage.getItem('clientToken');
  const decode = jwtDecode(token);

  const getuserBookDetail = async (req, res) => {
    await axios.get(`${GET_USER_BOOKING}/${location.state}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
      setDetail(res.data[0])
      setRooms(res.data.length)
    }).catch(err => console.log(`error - > ${err}`))
  }


  useEffect(() => {
    getuserBookDetail()
  }, [])

  console.log(detail);


  return (
    <>
      <Container maxW={'7xl'}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}>
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={detail?.hotel?.photos[0].image_url}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>

          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {detail?.hotel?.name}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}>
                BOOKING ID : {detail?._id}
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  user details
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>
                      <HStack>
                        <Text fontWeight={'500'}
                          textTransform={'uppercase'}>Name - </Text>
                        <Text fontWeight={'500'}>{detail?.user?.username}</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack>
                        <Text fontWeight={'500'}
                          textTransform={'uppercase'}>Mobile Number - </Text>
                        <Text fontWeight={'500'}>{detail?.user?.mobile}</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack>
                        <Text fontWeight={'500'}
                          textTransform={'uppercase'}>email - </Text>
                        <Text fontWeight={'500'}>{detail?.user?.email}</Text>
                      </HStack>
                    </ListItem>
                  </List>
                </SimpleGrid>
              </Box>
              <Box>
                <Text
                  fontSize={{ base: '16px', lg: '18px' }}
                  color={useColorModeValue('yellow.500', 'yellow.300')}
                  fontWeight={'500'}
                  textTransform={'uppercase'}
                  mb={'4'}>
                  Booking Details
                </Text>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                  <List spacing={2}>
                    <ListItem>
                      <HStack>
                      <Text fontWeight={'500'}
                          textTransform={'uppercase'}>Booking Date - 
                          </Text>
                        <Text fontWeight={'500'}>{detail?.user?.email}</Text>
                      </HStack>

                    </ListItem>

                    <ListItem>
                      <HStack>
                      <Text fontWeight={'500'}
                          textTransform={'uppercase'}>Check In  - 
                          </Text>
                        <Text fontWeight={'500'}>{detail?.user?.email}</Text>
                      </HStack>

                    </ListItem>

                    <ListItem>
                      <HStack>
                      <Text fontWeight={'500'}
                          textTransform={'uppercase'}>Check out - 
                          </Text>
                        <Text fontWeight={'500'}>{detail?.user?.email}</Text>
                      </HStack>

                    </ListItem>
                  </List>
                  <List spacing={2}>
                  <ListItem>
                      <HStack>
                      <Text fontWeight={'500'}
                          textTransform={'uppercase'}>room - 
                          </Text>
                        <Text fontWeight={'500'}>{detail?.room?.title}</Text>
                      </HStack>

                    </ListItem>

                    <ListItem>
                      <HStack>
                      <Text fontWeight={'500'}
                          textTransform={'uppercase'}>payment mode - 
                          </Text>
                        <Text fontWeight={'500'}>{detail?.payment_mode}</Text>
                      </HStack>

                    </ListItem>

                    <ListItem>
                      <HStack>
                      <Text fontWeight={'500'}
                          textTransform={'uppercase'}>rate - 
                          </Text>
                        <Text fontWeight={'500'}>{detail?.rate}</Text>
                      </HStack>

                    </ListItem>
                  </List>
                </SimpleGrid>
              </Box>
            </Stack>

            {/* <Button
              rounded={'none'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}>
              Confirm ? 
            </Button> */}

           
          </Stack>
        </SimpleGrid>
      </Container>

    </>
  )
}

export default SingleProperty
