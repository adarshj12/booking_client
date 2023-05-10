import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  Badge,
  ListItem,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import axios from '../../../utils/axios'
import { adminInstance } from '../../../utils/axios'

import { GET_USER } from '../../../utils/API'
import { useEffect, useState } from 'react';
import UpdateModal from './UpdateUserModal'

const ProfilePage = () => {
  const location = useLocation();
  const [user, setUser] = useState();
  // console.log(location.state.data);

  const getuser = async () => {
    const token = localStorage.getItem('adminToken');
    await adminInstance.get(`${GET_USER}/${location.state.data}`).then((res) => {
      setUser(res.data);
    }).catch((err) => {
      console.log(`error=> ${err.message}`)
    })
  }

  useEffect(() => {
    getuser();
  }, [getuser])
  // console.log(user);

  const status = user?.isBlocked ? "Blocked" : "Active";

  return (
    // <Container maxW={'7xl'}>
    //   <Box bg="white" w={600} p={4} rounded="lg" shadow="md" mb={4}>

    //     <Stack spacing={{ base: 6, md: 10 }}>
    //       <Box as={'header'}>
    //         <Heading
    //           lineHeight={1.1}
    //           fontWeight={600}
    //           fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
    //           {user?.username}
    //         </Heading>

    //       </Box>

    //       <Stack
    //         spacing={{ base: 4, sm: 6 }}
    //         direction={'column'}
    //         divider={
    //           <StackDivider
    //             borderColor={useColorModeValue('gray.200', 'gray.600')}
    //           />
    //         }>

    //         <Box>
    //           <Text
    //             fontSize={{ base: '16px', lg: '18px' }}
    //             color={useColorModeValue('yellow.500', 'yellow.300')}
    //             fontWeight={'500'}
    //             textTransform={'uppercase'}
    //             mb={'4'}>
    //             User Details
    //           </Text>

    //           <List spacing={2}>
    //             <ListItem>
    //               <Text as={'span'} fontWeight={'bold'}>
    //                 Email:
    //               </Text>{' '}
    //               {user?.email}
    //             </ListItem>
    //             <ListItem>
    //               <Text as={'span'} fontWeight={'bold'}>
    //                 Mobile Number:
    //               </Text>{' '}
    //               {user?.mobile}
    //             </ListItem>
    //             <ListItem>
    //               <Text as={'span'} fontWeight={'bold'}>
    //                 UserId:
    //               </Text>{' '}
    //               {user?._id}
    //             </ListItem>
    //             <ListItem>
    //               <Text as={"span"} fontWeight={"bold"}>
    //                 Status:
    //               </Text>{" "}
    //               <Badge colorScheme={user?.isBlocked ? "red" : "green"}>
    //                 {status}
    //               </Badge>
    //             </ListItem>

    //           </List>
    //         </Box>
    //       </Stack>

    //       <UpdateModal />
    //     </Stack>
    //   </Box>
    // </Container>
    <Container maxW={{ base: 'full', lg: '7xl' }}>
      <Box bg="white" w={{ base: 'full', lg: 600 }} p={4} rounded="lg" shadow="md" mb={4}>

        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {user?.username}
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

            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                User Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Email:
                  </Text>{' '}
                  {user?.email}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Mobile Number:
                  </Text>{' '}
                  {user?.mobile}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    UserId:
                  </Text>{' '}
                  {user?._id}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Status:
                  </Text>{" "}
                  <Badge colorScheme={user?.isBlocked ? "red" : "green"}>
                    {status}
                  </Badge>
                </ListItem>

              </List>
            </Box>
          </Stack>

          <UpdateModal user={user}/>
        </Stack>
      </Box>
    </Container>

  );
}

export default ProfilePage;