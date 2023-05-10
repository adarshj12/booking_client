import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Flex, Grid, FormControl, FormLabel, Input, Button, Text, VStack, Image, Container, AspectRatio, Stack, Heading, HStack } from "@chakra-ui/react";
import { gethotel } from '../../../utils/API'
import axios from '../../../utils/axios'
import jwtDecode from "jwt-decode";
import Swal from 'sweetalert2';
import SliderComponent from './ImageSlider'

const SingleProperty = () => {
  const [hotel, setHotel] = useState('')
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state);


  const getDetails = async () => {
    try {
      await axios.get(`${gethotel}/${location.state.data}`,{ headers: {'Content-Type': 'application/json' }}).then((res) => {
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
    { url: "data:image/jpeg;base64,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", title: "beach" },
    { url: "data:image/png;base64,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", title: "boat" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqRWR0No5fj6fJ3cXetxxcqYosxnad2fIykQ&usqp=CAU", title: "forest" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAR9V14Ghh4ZjqqHZqQni4xxIut6M948cMUQ&usqp=CAU", title: "city" },
    { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOEIXpZcXR-N8OH_q0Dj2ou6Vr1U69t4kM-w&usqp=CAU", title: "italy" },
];
  for(let i =0;i<hotel?.photos?.length;i++){
    slides[i].url=hotel?.photos[i]?.image_url;
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
        <Flex direction={{ base: "column", md: "row" }} h={575} py={15}>

          <VStack
            w='full'
            h='full'
            p={10}
            spacing={10}
            align='flex-start'
          >
 
              <Box style={containerStyles}>
                <SliderComponent slides={slides} />
              </Box>
          

          </VStack>

          <VStack
            w='full'
            h='full'
            p={8}
            spacing={8}
            align='flex-start'
          >
            <VStack spacing={2} >
              <Heading>{hotel?.name}</Heading>
            </VStack>

            <Stack spacing={5} width={350}>
              <FormControl id="email">
                <HStack>
                  <FormLabel mt={2}>Type :</FormLabel>
                  <Text >{hotel?.type}</Text>
                </HStack>
                <HStack>
                  <FormLabel mt={2}>City :</FormLabel>
                  <Text >{hotel?.city}</Text>
                </HStack>
                <HStack>
                  <FormLabel mt={2}>Address :</FormLabel>
                  <Text >{hotel?.address}</Text>
                </HStack>
                <HStack>
                  <FormLabel mt={2}>Descripton :</FormLabel>
                  <Text >{hotel?.desc?.slice(0,25)}...</Text>
                </HStack>
                <HStack>
                  <FormLabel mt={2}>Landmark :</FormLabel>
                  <Text >{hotel?.landmark}</Text>
                </HStack>
                <HStack>
                  <FormLabel mt={2}>Distance From Landmark :</FormLabel>
                  <Text >{hotel?.distance}</Text>
                </HStack>
                <HStack>
                  <FormLabel mt={2}>Features :</FormLabel>
                  <Text >City Name</Text>
                </HStack>
                <HStack>
                  <FormLabel mt={2}>Prices Starting From :</FormLabel>
                  <Text >{hotel?.cheapestPrice}</Text>
                </HStack>
                <Button borderRadius={0} onClick={()=>navigate('/client/update',{state:{data:hotel?._id}})}>Update</Button>
              </FormControl>

            </Stack>

          </VStack>

        </Flex>
      </Container>

    </>
  )
}

export default SingleProperty
