import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Flex, Grid, FormControl, FormLabel, Input, Button, Text, VStack, Image, Container, AspectRatio, Stack, Heading, HStack } from "@chakra-ui/react";
import { gethotel } from '../../../utils/API'
import axios from '../../../utils/axios'
import {adminInstance} from '../../../utils/axios'

import Swal from 'sweetalert2';
import SliderComponent from './ImageSlider'

const SingleProperty = () => {
  const [hotel, setHotel] = useState('')
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state);


  const getDetails = async () => {
    try {
      await axios.get(`${gethotel}/${location.state.data}`).then((res) => {
        if (res.status === 200) {
          setHotel(res.data)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Data not found'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    } catch (err) {
      console.log(`error => ${err}`)
    }

  }
  useEffect(() => {
    getDetails();
  }, [])

  // console.log(hotel);

  const slides = [
    { url: "", title: "boat" },
    { url: "", title: "forest" },
    { url: "", title: "city" },
    { url: "h", title: "italy" },
    { url: "h", title: "italy" },
  ];
  for (let i = 0; i < hotel?.photos?.length; i++) {
    slides[i].url = hotel?.photos[i]?.image_url;
  }
  const containerStyles = {
    width: "400px",
    height: "100%",
    maxWidth: "400px",
    margin: "0 auto",
  };


  return (
    <>
      <Container maxWidth='container.lg' padding={10}>
        <Flex
          direction={['column', 'column', 'row', 'row']}
          h={['auto', 'auto', '575px', '575px']}
          py={15}
        >
          <VStack
            w='full'
            h={['auto', 'auto', 'full', 'full']}
            p={10}
            spacing={10}
            align='flex-start'
          >
            <Box style={containerStyles} h={500}>
              <SliderComponent slides={slides} />
            </Box>
          </VStack>

          <VStack
            w='full'
            h={['auto', 'auto', 'full', 'full']}
            p={8}
            spacing={8}
            align='flex-start'
          >
            <VStack spacing={2}>
              <Heading>{hotel?.name}</Heading>
            </VStack>

            <Stack spacing={5} width={350}>
              <FormControl id="email">
                <HStack>
                  <FormLabel mt={2}>Type :</FormLabel>
                  <Text>{hotel?.type}</Text>
                </HStack>
                <HStack>
                  <FormLabel mt={2}>City :</FormLabel>
                  <Text>{hotel?.city}</Text>
                </HStack>
                <HStack>
                  <FormLabel mt={2}>Address :</FormLabel>
                  <Text>{hotel?.address}</Text>
                </HStack>
                <HStack>
                  <FormLabel mt={2}>Descripton :</FormLabel>
                  <Text>{hotel?.desc?.slice(0, 25)}...</Text>
                </HStack>
                <HStack>
                  <FormLabel mt={2}>Landmark :</FormLabel>
                  <Text>{hotel?.landmark}</Text>
                </HStack>
                <HStack>
                  <FormLabel mt={2}>Distance From Landmark :</FormLabel>
                  <Text>{hotel?.distance}</Text>
                </HStack>
                <HStack>
                  <FormLabel mt={2}>Features :</FormLabel>
                  <Text>City Name</Text>
                </HStack>
                <HStack>
                  <FormLabel mt={2}>Prices Starting From :</FormLabel>
                  <Text>{hotel?.cheapestPrice}</Text>
                </HStack>
              </FormControl>
            </Stack>
          </VStack>
        </Flex>
      </Container>



    </>
  )
}

export default SingleProperty
