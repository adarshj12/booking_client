import { Image, Box, Stack, Flex, Text, Container,Grid, Heading, Center, HStack, VStack, Spacer,useBreakpointValue } from '@chakra-ui/react'
import axios from '../../../utils/axios'
import { COUNT_BY_CITY } from '../../../utils/API'
import { TOP_DESTINATIONS } from '../../../utils/API'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { newSearch } from '../../../redux/searchSlice';
const TopDestinations = () => {
  const columns = useBreakpointValue({ base: 1, md: 3 });
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [top, setTop] = useState([])
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: 'selection'
    }

  ])
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1
  })


  const countByCity = async () => {
    await axios.get(`${COUNT_BY_CITY}?cities=Kolkata,Mumbai,Nagpur`).then((res) => {
      setData(res.data)
    }).catch((err) => {
      console.log(`error -> ${err.message}`);
    })
  }
  const topDest = async () => {
    await axios.get(TOP_DESTINATIONS).then((res) => {
      console.log(res.data);
      setTop(res.data)
    }).catch((err) => {
      console.log(`error -> ${err.message}`);
    })
  }

  useEffect(() => {
    countByCity()
    topDest()
  }, [])

  const handleSearch = (city) => {

    dispatch(newSearch({
      destination: city,
      dates,
      options
    }));
    navigate('/search')
  }
  return (
    <>
      {/* <Container ml={50} mt={10} maxW={'7xl'}>
        <Center>

          <VStack>
            <Heading textTransform={'uppercase'}>Top Destinations</Heading>
            <HStack color={'blackAlpha.500'}>
              <Text>100+ Cities</Text>
              <Spacer />
              <Text>1000+ Hotels</Text>
              <Spacer />
              <Text>20000+ Rooms</Text>
              <Spacer />
              <Text>3M+ Happy Guests</Text>
            </HStack>

          </VStack>
        </Center>
        <Stack direction='row' spacing={4} flexWrap='wrap'>
          {top && top.map((elem, i) => {
            return (
              <Flex p={8} position='relative' direction='column' alignItems='center' key={i}>
                <Image h={400} w={300} objectFit='cover' src={elem.photo} alt={elem.city} _hover={{ cursor: 'pointer' }} 
                onClick={()=>handleSearch(elem.city)} 
                />
                <Box position='absolute' top={'50%'} left={0} zIndex={1} transform='translate(50%, 50%)'>
                  <Heading fontWeight='bold' color='white'>{elem.city}</Heading>
                </Box>
              </Flex>
            )
          })

          }
        </Stack>

      </Container> */}
      <Container  mt={10} maxW={'7xl'}>
      <Center>
        <VStack>
          <Heading textTransform={'uppercase'}>Top Destinations</Heading>
          <HStack color={'blackAlpha.500'}>
            <Text>100+ Cities</Text>
            <Spacer />
            <Text>1000+ Hotels</Text>
            <Spacer />
            <Text>20000+ Rooms</Text>
            <Spacer />
            <Text>3M+ Happy Guests</Text>
          </HStack>
        </VStack>
      </Center>
      <Grid templateColumns={`repeat(${columns}, 1fr)`} gap={4}>
        {top && top.map((elem, i) => {
          return (
            <Box key={i}>
              <Flex p={8} position='relative' direction='column' alignItems='center'>
                <Image h={400} w={300} objectFit='cover' src={elem.photo} alt={elem.city} _hover={{ cursor: 'pointer' }} onClick={() => handleSearch(elem.city)} />
                <Box position='absolute' top={'50%'} left={0} zIndex={1} transform='translate(50%, 50%)'>
                  <Heading fontWeight='bold' color='white'>{elem.city}</Heading>
                </Box>
              </Flex>
            </Box>
          )
        })}
      </Grid>
    </Container>

    </>
  )
}

export default TopDestinations;