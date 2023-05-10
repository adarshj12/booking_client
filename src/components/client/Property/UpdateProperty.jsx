import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  HStack,
  VStack,
  Image,
  Center,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

import { gethotel } from '../../../utils/API'
import { UPDATE_HOTEL } from '../../../utils/API'
import axios from '../../../utils/axios'
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';



const UpdateProperty = () => {
  const [hotel, setHotel] = useState({})
  const location = useLocation();
  const navigate = useNavigate()
  const imageArray = []
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [distance, setDistance] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [cheapestPrice, setCheapestPrice] = useState(0)
  const [landmark, setLandmark] = useState('')
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [loading, setLoading] = useState(false);
  const getDetails = async () => {
    await axios.get(`${gethotel}/${location.state.data}`).then((res) => {
      if (res.status === 200) {
        setHotel(res.data)
        setName(res.data.name);
        setType(res.data.type);
        setCity(res.data.city);
        setAddress(res.data.address);
        setDistance(res.data.distance);
        setLandmark(res.data.landmark);
        setLat(res.data.lattitude);
        setLong(res.data.longitude);
        setDesc(res.data.desc);
        setCheapestPrice(res.data.cheapestPrice);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Data not found'
        })
      }
    }).catch((err) => {
      console.log(err)
    })

  }


  useEffect(() => {
    getDetails();
  }, [])

  const ImageChange = (file, image_id) => {
    imageArray.push({
      filename: file,
      id: image_id
    })

  }



  const updateHotel = async () => {
    console.log(imageArray, "heyfhtfgh");
    const formData = new FormData();
    for (let i = 0; i < imageArray?.length; i++) {
      console.log(imageArray[i]);
      formData.append('image', imageArray[i].filename);
      formData.append('image_id', imageArray[i].id);
    }

    formData.append("name", name);
    formData.append("type", type);
    formData.append("city", city);
    formData.append("address", address)
    formData.append("distance", distance)
    formData.append("landmark", landmark);
    formData.append("lattitude", lat);
    formData.append("longitude", long);
    formData.append("desc", desc)
    formData.append("cheapestPrice", cheapestPrice)
    const token = localStorage.getItem('clientToken');
    setLoading(true);
    await axios.put(`${UPDATE_HOTEL}/${location.state.data}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        navigate('/client/property')
        Swal.fire(
          'Hotel Updated!',
          `${hotel?.name} has been updated!`,
          'success'
        )
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Data not found'
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>


      {loading ?
        <div className="loading-spinner">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#234790"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
        :
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={'white.800'}>
          <Stack
            spacing={4}
            w={'1500px'}
            bg={'white'}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
              Edit Property
            </Heading>
            <Center>
              <Button onClick={() => navigate('/client/addroom', { state: { id: location.state.data, name: hotel?.name } })}>Add Rooms</Button>
            </Center>
            <FormControl id="userName">
              <FormLabel>Images</FormLabel>
              <Stack ml={20} direction={['column', 'row']} spacing={6}>
                <HStack>
                  <VStack>
                    <Image size="md" src={hotel?.photos?.[0]?.image_url} h={350} width={200} />
                    <Button w="200px"><input type='file' onChange={(e) => ImageChange(e.target.files[0], hotel.photos[0]._id)} />Change</Button>
                  </VStack>

                  <VStack>
                    <Image size="md" src={hotel?.photos?.[1]?.image_url} h={350} width={200} />
                    <Button w="200px"><input type='file' onChange={(e) => ImageChange(e.target.files[0], hotel.photos[1]._id)} />Change</Button>
                  </VStack>

                  <VStack>
                    <Image size="md" src={hotel?.photos?.[2]?.image_url} h={350} width={200} />
                    <Button w="200px"><input type='file' onChange={(e) => ImageChange(e.target.files[0], hotel.photos[2]._id)} />Change</Button>
                  </VStack>


                  <VStack>
                    <Image size="md" src={hotel?.photos?.[3]?.image_url} h={350} width={200} />
                    <Button w="200px"><input type='file' onChange={(e) => ImageChange(e.target.files[0], hotel.photos[3]._id)} />Change</Button>
                  </VStack>

                  <VStack>
                    <Image size="md" src={hotel?.photos?.[4]?.image_url} h={350} width={200} />
                    <Button w="200px"><input type='file' onChange={(e) => ImageChange(e.target.files[0], hotel.photos[4]._id)} />Change</Button>
                  </VStack>





                </HStack>
              </Stack>
            </FormControl>
            <SimpleGrid columns={2} spacingX='40px' spacingY='20px'>
              <HStack>
                <Text fontWeight={500}>Name</Text>
                <Input defaultValue={hotel?.name} name="name" type='text' id='name' onChange={(e) => setName(e.target?.value)} />
              </HStack>
              <HStack>
                <Text fontWeight={500}>Type Of property</Text>
                <Input defaultValue={hotel?.type} onChange={(e) => setType(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight={500}>City</Text>
                <Input defaultValue={hotel?.city} onChange={(e) => setCity(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight={500}>Address</Text>
                <Input defaultValue={hotel?.address} onChange={(e) => setAddress(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight={500}>LandMark</Text>
                <Input defaultValue={hotel?.landmark} onChange={(e) => setLandmark(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight={500}>Latitude</Text>
                <Input defaultValue={hotel?.lattitude} onChange={(e) => setLat(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight={500}>Longitude</Text>
                <Input defaultValue={hotel?.longitude} onChange={(e) => setLong(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight={500}> Description</Text>
                <Input defaultValue={hotel?.desc} onChange={(e) => setDesc(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight={500}> Distance From Landmark</Text>
                <Input defaultValue={hotel?.distance} onChange={(e) => setDistance(e.target.value)} />
              </HStack>
              <HStack>
                <Text fontWeight={500}>Prices Starting From</Text>
                <Input type='number' defaultValue={hotel?.cheapestPrice} onChange={(e) => setCheapestPrice(e.target.value)} />
              </HStack>
            </SimpleGrid>
            <Stack spacing={6} direction={['column', 'row']} align="center" justify="center">

              <Button
                bg={'blue.400'}
                color={'white'}
                w="200px"
                onClick={() => updateHotel()}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      }
    </>


  );
}

export default UpdateProperty

