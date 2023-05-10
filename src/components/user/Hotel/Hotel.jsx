import {
    Box,
    Button,
    HStack,
    Heading,
    Spacer,
    Text,
    Center,
    Flex,
    VStack,
    Divider,
    Stack,
    Image
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'
import { FaMapMarkerAlt, FaParking } from 'react-icons/fa';
import { SiGooglestreetview } from 'react-icons/si';
import { GiCoffeeCup } from 'react-icons/gi';
import { TbAirConditioning, TbFridge } from 'react-icons/tb';
import { MdSignalWifi3Bar } from 'react-icons/md';
import RoomSelection from './RoomSelectionModal';
import { setLastVisitedUrl } from '../../../redux/urlSlice';
import Map from './LocationMap';
import SliderComponent from './ImageSlider'
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import axios from '../../../utils/axios'
import { gethotel } from '../../../utils/API'
import { GET_HOTEL_ROOMS, HOTEL_RATING } from '../../../utils/API'
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
const Hotel = () => {
    const location = useLocation();
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const search = useSelector(state => state.search)
    const user = useSelector(state => state.user.user)
    // console.log(search);
    // console.log(search.dates[0].startDate);
    let startDate = search.dates[0].startDate;
    let endDate = search.dates[0].endDate
    const adults = search.options.adult
    // console.log(location.state.data);
    const [hotel, setHotel] = useState('')
    const [rate, setRate] = useState(0)
    const [rooms, setRooms] = useState([])
    const [titleCount, setTitleCount] = useState({})
    const [rating, setRating] = useState(0)
    const getDetails = async () => {
        await axios.get(`${gethotel}/${params.id}`, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
            if (res.status === 200) {
                setHotel(res.data)
            } else {
                toast.error('data not found')
                navigate('/error')
            }
        }).catch((err) => {
            console.log(err)
            toast.error(err.message)
            navigate('/error')
        })

    }
    const getRooms = async () => {
        //tokn send
        await axios.get(`${GET_HOTEL_ROOMS}/${params.id}/${startDate}/${endDate}`, { headers: { 'Content-Type': 'application/json' } }).then((res) => {
            if (res.status === 200) {
                // console.log(res.data);
                const uniqueArr = res.data.filter((obj, index, self) => {
                    return index === self.findIndex((t) => (
                        t.title === obj.title
                    ));
                });
                setRooms(uniqueArr)

                let newTitleCount = {};

                for (let i = 0; i < res.data.length; i++) {
                    let title = res.data[i].title;
                    newTitleCount[title] = (newTitleCount[title] || 0) + 1;
                }

                setTitleCount(newTitleCount);
            } else {
                toast.error('data not found')
                navigate('/error')
            }
        }).catch((err) => {
            console.log(err)
            toast.error(err.message)
            navigate('/error')
        })
    }
    const getRating = async () => {
        await axios.get(`${HOTEL_RATING}/${params.id}`).then(res => {
            setRating(res.data[0].rating)
        })
    }
    useEffect(() => {
        getDetails();
        getRooms();
        getRating()
        dispatch(setLastVisitedUrl({
            url: window.location.pathname
        }))
    }, [])
    // console.log('rooms array',rooms)
    //console.log('frequency counter',titleCount)

    const slides = [
        { url: "", title: "hotel" },
        { url: "", title: "hotel" },
        { url: "", title: "hotel" },
        { url: "", title: "hotel" },
        { url: "", title: "hotel" },
    ];
    for (let i = 0; i < hotel?.photos?.length; i++) {
        slides[i].url = hotel?.photos[i]?.image_url;
    }
    const roomslides = rooms.map((item) => {
        const photos = item?.photos || [];
        return {
            slides: photos?.map((photo) => ({
                url: photo?.image_url || "",
                title: item?.title || "room",
            })),
        };
    });

    // const containerStyles = {
    //     width: "1300px",
    //     height: "500px",
    //     margin: "0 auto",
    // };
    // const roomStyles = {
    //     width: "300px",
    //     height: "250px",
    //     margin: "0 auto",
    // };

    const containerStyles = {
        maxWidth: "1300px",
        height: "50vw",
        margin: "0 auto",
    };
    const roomStyles = {
        width: "90%",
        height: "25vw",
        margin: "0 auto",
    };

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const countDays = (date1, date2) => {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }
    // console.log(countDays(search.dates[0].startDate, search.dates[0].endDate));
    // console.log(typeof(countDays(search.dates[0].startDate, search.dates[0].endDate)));
    const numberOfDays = countDays(search.dates[0].startDate, search.dates[0].endDate);
    console.log(search.dates[0].startDate, search.dates[0].endDate);

    const getDatesRange = (start, end) => {
        const date = new Date(start.getTime())

        let list = [];
        while (date <= end) {
            list.push(new Date(date))
            //list.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return list;
    }
    // console.log(getDatesRange(search.dates[0].startDate, search.dates[0].endDate));
    const dateRange = getDatesRange(search.dates[0].startDate, search.dates[0].endDate)

    return (
        <>
            <Box p={10}>
                <HStack>
                    <Heading flex="1">{hotel?.name}</Heading>
                    <Spacer />
                    <Button bgColor="#003580" color="white" fontWeight="bold" borderRadius={0} _hover={{ bgColor: "none" }} >
                        {Number(rating.toFixed(1))}
                    </Button>
                </HStack>
                <HStack mb={10}>
                    <FaMapMarkerAlt />
                    <Text>{hotel?.landmark}</Text>
                    <SiGooglestreetview style={{ color: "#286c16" }} />
                    <Map
                        lattitude={hotel?.lattitude}
                        longitude={hotel?.longitude}
                    />
                </HStack>
                <Box style={containerStyles}>
                    <SliderComponent slides={slides} />
                </Box>
                <Flex>
                    <Text mt={50} fontSize={20} fontWeight={600}>Amenities</Text>
                    <Spacer />

                </Flex>
                <Flex direction={['column', 'row']} justify='space-between' align='center'>
                    <HStack>
                        <GiCoffeeCup /><Text>Restaurant</Text>
                    </HStack>
                    <Divider orientation='vertical' display={['none', 'block']} />
                    <HStack>
                        <TbAirConditioning /><Text>Air Conditioning</Text>
                    </HStack>
                    <Divider orientation='vertical' display={['none', 'block']} />
                    <HStack>
                        <MdSignalWifi3Bar /><Text>Wi-Fi</Text>
                    </HStack>
                    <Divider orientation='vertical' display={['none', 'block']} />
                    <HStack>
                        <TbFridge /><Text>Refrigerator</Text>
                    </HStack>
                    <Divider orientation='vertical' display={['none', 'block']} />
                    <HStack>
                        <FaParking /><Text>Parking</Text>
                    </HStack>
                </Flex>

                <Text mt={50} fontSize={20} fontWeight={600}>About The Hotel</Text>
                <Text mt={25}>{hotel?.desc}
                </Text>
                <Text mt={50} fontSize={20} fontWeight={600}>Address</Text>
                <Text mt={25}>{hotel?.address}</Text>

                {rooms && <Text mt={50} fontSize={20} fontWeight={600}>Room Types</Text>}



                {
                    rooms && rooms.map((item, i) => {
                        return (
                            <>
                                <HStack p={10} minH={'300px'} key={i}>
                                    <Box width="30%"  >
                                        <Box style={roomStyles} >
                                            <SliderComponent slides={roomslides[i]?.slides} />
                                        </Box>
                                    </Box>
                                    <Center height='300px'  >
                                        <Divider orientation='vertical' />
                                    </Center>
                                    <Box width="30%" textAlign="center" display="flex" alignItems="center" justifyContent="center" >
                                        <VStack>
                                            <Text fontWeight={'bold'}>{item.title} </Text>
                                            <Text fontWeight={600}>{item.desc} </Text>
                                            <Text>Room for {item.people} </Text>
                                        </VStack>
                                    </Box>
                                    <Center height='300px'  >
                                        <Divider orientation='vertical' />
                                    </Center>
                                    <Box width="30%" textAlign="center" alignItems="center" justifyContent="center">
                                        <Text mt={10}> Rate for {adults} Adult(s) for {numberOfDays} Night Stay </Text>
                                        <Text mt={10} fontWeight={'bold'}>₹ {item.people * numberOfDays * item.rate}  </Text>
                                        {
                                            user ?
                                                <RoomSelection
                                                    hotelid={params.id}
                                                    roomid={item._id}
                                                    dateRange={dateRange}
                                                    address={hotel.address}
                                                    hotel={hotel.name}
                                                    room={item.title}
                                                    rate={item.people * numberOfDays * item.rate}
                                                    days={numberOfDays}
                                                    number={search.options.room}
                                                    maxCount={titleCount}
                                                    photo={hotel?.photos[0]?.image_url}
                                                />
                                                :
                                                <Button
                                                    mt={10}
                                                    colorScheme="orange"
                                                    bgGradient="linear(to-r, orange.400, orange.500, orange.600)"
                                                    color="white"
                                                    variant="solid"
                                                    onClick={() => navigate('/login')}
                                                >
                                                    Login to Reserve
                                                </Button>
                                        }
                                    </Box>
                                </HStack>
                            </>
                        )
                    })
                }
                <Toaster />
            </Box>


        </>
    )
}

export default Hotel;
