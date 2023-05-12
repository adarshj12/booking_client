import React, { useEffect, useState } from 'react'
import { Box, Button, Input, Flex, Center, Grid, useMediaQuery } from '@chakra-ui/react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import format from 'date-fns/format';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { newSearch } from '../../../redux/searchSlice';
import Searchbar from '../Search/SearchBar'
import { DESTINATIONS } from '../../../utils/API';
import { BANNER } from '../../../utils/API';
import axios from '../../../utils/axios'
const Header = () => {
    const [data, setData] = useState([]);
    const mobile = useSelector(state => state.user.mobile);
    const user = useSelector(state => state.user.user);
    const [toastShown, setToastShown] = useState(false);
    const [video, setVideo] = useState('')
    const places = async () => {
        await axios.get(DESTINATIONS).then(res => setData(res.data)).catch(err => console.log(`places fetch error : ${err.message}`))
    }
    const banner = async () => {
        await axios.get(BANNER).then(res => setVideo(res.data)).catch(err => console.log(`places fetch error : ${err.message}`))
    }

    const checkgoogleAuth = () => {
        if (user && !mobile && !toastShown)
            toast('You have logged in with Google, please update mobile no. in profile page!', {
                icon: '⚠️',
                style: {
                    color: 'black',
                },
            });
        setToastShown(true)
    }
    useEffect(() => {
        banner()
        places();
        checkgoogleAuth()
    }, [])
    const isSmallDevice = useMediaQuery({ maxWidth: "767px" });

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [destination, setDestination] = useState('');
    const [openOptions, setOpenOptions] = useState(false);

    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })
    const [openDate, setOpenDate] = useState(false);
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
            key: 'selection'
        }

    ])

    const handleOption = (option, operation) => {
        if (operation === "inc") {
            setOptions(prevOptions => ({ ...prevOptions, [option]: prevOptions[option] + 1 }));
        }
        else {
            setOptions(prevOptions => ({ ...prevOptions, [option]: prevOptions[option] - 1 }));
        }
    }


    const handleSearch = () => {
        console.log(destination, options, dates);
        if (destination === '') {
            toast.error('Please Select Destination...')
        } else {

            dispatch(newSearch({ destination, dates, options }));
            localStorage.removeItem('search')
            localStorage.setItem('search', JSON.stringify({
                destination, dates, options
              }))
            navigate('/search')
        }
    }
    const brightnessValue = openOptions || openDate ? 'brightness(50%)' : 'brightness(100%)';

    return (

        <>
            <Box position="relative" width="100%" height="450px" overflow="hidden" >
                <video
                    src={video?.video}
                    autoPlay
                    muted
                    loop
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "450px",
                        objectFit: "cover",
                        filter: brightnessValue
                    }}
                />
                <Center mt={8}>
                    <Flex >
                        <Box w={250} >

                            <Searchbar data={data} setDestination={setDestination} destination={destination} />
                        </Box>
                        <Box w={250} >

                            <Input _hover={{ cursor: 'context-menu' }} bg={'white'} rounded={'none'} placeholder={`${format(dates[0].startDate, "MM/dd/yyyy")} ${String.fromCharCode(0x2192)} ${format(dates[0].endDate, "MM/dd/yyyy")}`} size='md' onClick={() => setOpenDate(!openDate)} />
                            {openDate && <DateRange
                                className="date-range"
                                editableDateInputs={true}
                                onChange={item => setDates([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                                minDate={new Date()}
                            />}

                        </Box>
                        <Box w={250}>

                            <Input _hover={{ cursor: 'context-menu' }} bg={'white'} rounded={'none'} placeholder={`${options.adult} adult . ${options.children} children . ${options.room} room`} size='md' onClick={() => setOpenOptions(!openOptions)} />
                            {openOptions &&
                                <div className="date-range">
                                    <div className="options">
                                        <div className="optionItem">
                                            <span className="optionText">Adult</span>
                                            <div className="optionCounter">
                                                <button disabled={options.adult <= 1} className="optionCounterButton" onClick={() => handleOption("adult", "dec")}>-</button>
                                                <span className="optionCounterNumber">{options.adult}</span>
                                                <button className="optionCounterButton" onClick={() => handleOption("adult", "inc")}>+</button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Children</span>
                                            <div className="optionCounter">
                                                <button disabled={options.children <= 0} className="optionCounterButton" onClick={() => handleOption("children", "dec")}>-</button>
                                                <span className="optionCounterNumber">{options.children}</span>
                                                <button className="optionCounterButton" onClick={() => handleOption("children", "inc")}>+</button>
                                            </div>
                                        </div>
                                        <div className="optionItem">
                                            <span className="optionText">Room</span>
                                            <div className="optionCounter">
                                                <button disabled={options.room <= 1} className="optionCounterButton" onClick={() => handleOption("room", "dec")}>-</button>
                                                <span className="optionCounterNumber">{options.room}</span>
                                                <button className="optionCounterButton" onClick={() => handleOption("room", "inc")}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </Box>
                        <Button w={100} bg={'orange.600'} _hover={{ bgColor: "none" }} rounded={'none'} onClick={() => handleSearch()}>Search</Button>
                    </Flex>
                </Center>
                <Toaster />
            </Box>
        </>

    )
}

export default Header;


