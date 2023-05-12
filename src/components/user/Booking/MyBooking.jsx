import {
    Box,
    Container,
    Text,
    Flex,
    Button,
    Heading,
    Spacer,
    Stack,
    HStack,
    VStack
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from '../../../utils/axios'
import { GET_MY_BOOKING, START_CONVERSATION, GET_CONVERSATIONS } from '../../../utils/API';
import toast, { Toaster } from "react-hot-toast";
import { BsArrowLeftRight, BsFillPersonFill } from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineChatAlt2 } from 'react-icons/hi'
import Review from './ReviewModal'
import jwtDecode from 'jwt-decode';
const Booking = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [booking, setBooking] = useState()
    const token = localStorage.getItem('userToken');
    const [cancel, setCancel] = useState(false)
    const [review, setReview] = useState(false)
    const [status, setStatus] = useState(false)
    const decode = jwtDecode(token)

    const getData = async () => {
        await axios.get(`${GET_MY_BOOKING}/${location.state}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
            // console.log(res.data)
            setBooking(res.data);
        }).catch(err => {
            toast.error(err.response.data.message)
            if (err.response.status === 403) {
               localStorage.removeItem('userToken')
               navigate('/login')
             }
           })
    }
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (booking) {
            let checkin = booking?.checkin;
            let checkout = booking?.checkout;
            let currentDate = new Date();
            let checkinDate = new Date(checkin);
            let checkoutDate = new Date(checkout);

            if (checkinDate > currentDate) {
                // console.log("The check-in date is later than today's date");
                setCancel(true);
            }

            if (checkoutDate < currentDate) {
                // console.log("The check-out date is earlier than today's date");
                setReview(true);
            }
            if (booking.status === 'canceled') setStatus(true)
        }
    }, [booking]);

    const chat = async (clientid) => {
        console.log(booking?.user?._id, clientid);
        await axios.get(`${GET_CONVERSATIONS}/${booking?.user?._id}`).then(async (res) => {
            console.log(res.data)
            if (res.data.length === 0 || !res.data[0].members.includes(clientid)) {
                const data = {
                    senderId: booking?.user?._id,
                    receiverId: clientid
                }
                await axios.post(START_CONVERSATION, data).then(res => {
                    navigate('/profile/chat')
                }).catch(err => toast.error(err.message))
            } else {
                navigate('/profile/chat')
            }
        }).catch(err => toast.error(err.message))
    }

    return (
        <Container maxW={'7xl'}>
            <Box mt={5}>

                <Box mt={5} mb={5}>
                    <Flex>
                        <Box  >
                            <Heading >{booking?.hotel?.name}</Heading>
                        </Box>
                        <Spacer />
                        {status ?
                            <VStack>
                                <Heading fontStyle={'italic'} color={'red'} fontFamily={'sans-serif'}>Canceled</Heading>
                                <Text>Awaiting Refund</Text>
                            </VStack>
                            :
                            <Box p='4'>
                                {
                                    cancel &&
                                    <HStack>
                                        <VStack>
                                            <HiOutlineChatAlt2 fontSize={50} color={'blue.800'} onClick={() => chat(booking?.hotel?.client)} />
                                            <Text>Chat With {booking?.hotel?.name} HR</Text>
                                        </VStack>


                                        <Spacer />
                                        <Spacer />
                                        <Button rounded={'none'} bg={'red.300'}>Cancel</Button>
                                    </HStack>

                                }
                                {
                                    review &&
                                    <Review
                                        hotelid={booking?.hotel?._id}
                                        userid={booking?.user?._id}
                                        hotel={booking?.hotel?.name}
                                    />
                                }
                            </Box>
                        }
                    </Flex>
                    <Text>{booking?.hotel?.city}</Text>
                    <Text>Booking Id : #{booking?._id}</Text>
                    <Text>Booking Date: {new Date(booking?.booking_date).toDateString()}</Text>
                </Box>
                <Box
                    bg="gray.200"
                    color="black"
                    textTransform="uppercase"
                    width="100%"
                    p={4}
                >
                    HOTEL INFORMATION
                </Box>
                <Box mt={5} mb={5}>
                    <Text fontWeight={'bold'}>{booking?.hotel?.name}</Text>
                    <Flex>
                        <Box p='4' >
                            <Text>{booking?.hotel?.title}</Text>
                            <Text>{booking?.rooms?.length} Room ({booking?.rooms[0]?.title})</Text>
                            <Text>1 Adult</Text>
                        </Box>
                        <Spacer />
                        <Box p='4' >
                            <Flex>
                                <Box p='4' >
                                    <Text>Check In</Text>
                                    <Text fontWeight={'bold'}> {new Date(booking?.checkin).toDateString()}</Text>
                                </Box>
                                <Box p='4' mt={5} >
                                    <BsArrowLeftRight />
                                </Box>
                                <Box p='4' >
                                    <Text>Check Out</Text>
                                    <Text fontWeight={'bold'}>{new Date(booking?.checkout).toDateString()}</Text>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                </Box>
                <Box
                    bg="gray.200" // Set the default grey box color
                    color="black" // Set the text color to black
                    textTransform="uppercase" // Set the text to uppercase
                    width="100%" // Set the width to 100% for responsiveness
                    p={4} // Add padding to the box
                >
                    TRAVELLER INFORMATION
                </Box>
                <Box mt={5} mb={5}>
                    <HStack>
                        <BsFillPersonFill fontSize={40} />
                        <Text fontWeight={'extrabold'} textTransform={'uppercase'}>{booking?.user?.username}</Text>

                    </HStack>
                    <Text>{booking?.user?.email}</Text>
                    <Text>+91{booking?.user?.mobile}</Text>
                </Box>
                <Box
                    bg="gray.200"
                    color="black"
                    textTransform="uppercase"
                    width="100%"
                    p={4}
                >
                    PAYMENT INFORMATION
                </Box>
                <Box mt={[3, 5]} mb={[3, 5]}>
                    <Stack spacing={[2, 3]}>
                        <HStack>
                            <Text>Total:</Text>
                            <Text fontWeight='bold' fontSize={['md', 'lg']}>₹ {booking?.rate}</Text>
                        </HStack>
                        <HStack>
                            <Text textTransform='uppercase'>Payment Mode:</Text>
                            <Text fontSize={['sm', 'md']}>{booking?.payment_mode}</Text>
                        </HStack>
                        <HStack>
                            <Text textTransform='uppercase'>Transaction ID:</Text>
                            <Text fontSize={['sm', 'md']}>{booking?.payment_id}</Text>
                        </HStack>
                    </Stack>
                </Box>

            </Box>
            <Toaster />
        </Container>
    );
}

export default Booking;