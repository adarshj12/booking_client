import {
  Badge,
  Input,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { setLastVisitedUrl } from '../../../redux/urlSlice';
import { useEffect, useState } from 'react';
import { DESTINATIONS } from '../../../utils/API';
import axios from '../../../utils/axios'
import Searchbar from './SearchBar'
import toast, { Toaster } from "react-hot-toast";
import { newSearch } from '../../../redux/searchSlice';
const SearchItem = ({ data }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [destination, setDestination] = useState(useSelector(state => state.search.city));
  const [cities, setcities] = useState([])
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: 'selection'
    }

  ])
  const places = async () => {
    await axios.get(DESTINATIONS).then(
      res => setcities(res.data)
    ).catch(err => console.log(`places fetch error : ${err.message}`))
  }
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1
  })
  const color1 = useColorModeValue('white', 'gray.900');
  const color2 = useColorModeValue('white', 'gray.900');
  const color4 = useColorModeValue('gray.50', 'gray.800');
  useEffect(() => {
    places()
    dispatch(setLastVisitedUrl({
      url: window.location.pathname
    }))
  }, [])
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
      localStorage.setItem('search', JSON.stringify({
        destination, dates, options
      }))
      navigate('/search')
    }
  }
  return (
    <>
      <Center>
        <Flex  >
          <Box w={250} >

            {/* <Input rounded={'none'} placeholder={`${destination}`} onChange={(e)=>setDestination(e.target.value)} color='black' size='md' /> */}
            <Searchbar data={cities} setDestination={setDestination} destination={destination} />
          </Box>
          <Box w={250} >

            <Input _hover={{ cursor: 'context-menu' }} rounded={'none'} placeholder={`${format(dates[0].startDate, "MM/dd/yyyy")} ${String.fromCharCode(0x2192)} ${format(dates[0].endDate, "MM/dd/yyyy")}`} size='md' onClick={() => setOpenDate(!openDate)} />
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

            <Input _hover={{ cursor: 'context-menu' }} rounded={'none'} placeholder={`${options.adult} adult . ${options.children} children . ${options.room} room`} size='md' onClick={() => setOpenOptions(!openOptions)} />
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
          <Button w={100} bg={'blue.600'} rounded={'none'} onClick={() => handleSearch()}>Search</Button>
        </Flex>
      </Center>
      {
        data && data.map((item, i) => {
          return (
            <Center py={6} key={i} >
              <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: '100%', md: '540px' }}
                height={{ sm: '476px', md: '20rem' }}
                direction={{ base: 'column', md: 'row' }}
                bg={color1}
                boxShadow={'2xl'}

                padding={4}>
                <Flex flex={1} bg="blue.200" >
                  <Image
                    objectFit="cover"
                    boxSize="100%"
                    src={item.photos[0].image_url}
                  />
                </Flex>
                <Stack
                  flex={1}
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  p={1}
                  pt={2}>
                  <Heading fontSize={'2xl'} fontFamily={'body'}>
                    {item.name}
                  </Heading>
                  <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                    {item.type}
                  </Text>
                  <Text
                    textAlign={'center'}
                    color={color2}
                    px={3}>
                    {item.title}
                    <Text fontWeight={600} color={'orange.500'} size="sm" mb={4}>
                      {item.city}
                    </Text>
                  </Text>
                  <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                    <Badge
                      px={2}
                      py={1}
                      bg={color4}
                      fontWeight={'400'}>
                      Rates starting from ₹{item.cheapestPrice}
                    </Badge>
                    <Badge
                      px={2}
                      py={1}
                      bg={color4}
                      fontWeight={'400'}>
                      {/* 9.5 */}
                    </Badge>
                  </Stack>

                  <Stack
                    width={'100%'}
                    mt={'2rem'}
                    direction={'row'}
                    padding={2}
                    justifyContent={'space-between'}
                    alignItems={'center'}>

                    <Button
                      flex={1}
                      fontSize={'sm'}
                      rounded={'full'}
                      bg={'blue.400'}
                      color={'white'}
                      // onClick={() => navigate('/hotel', { state: { data: item._id } })}
                      onClick={() => navigate(`/hotel/${item._id}`)}
                      boxShadow={
                        '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                      }
                      _hover={{
                        bg: 'blue.500',
                      }}
                      _focus={{
                        bg: 'blue.500',
                      }}>
                      See  Availability
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
              <Toaster />
            </Center>
          )
        })
      }
    </>
  );
}

export default SearchItem;