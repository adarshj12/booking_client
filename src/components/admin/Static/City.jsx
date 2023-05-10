import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Grid
} from '@chakra-ui/react';
import Add from './CityModal'
import { useEffect, useState } from 'react';
import axios from '../../../utils/axios'
import {adminInstance} from '../../../utils/axios'

import { ADMIN_CITIES } from '../../../utils/API';
import Spinner from '../../../pages/HomeSpinner'
export default function ProductSimple() {
  const [cities, setCities] = useState([])
  const token = localStorage.getItem('adminToken')
  const [loading, setLoading] = useState(false)
  const places = async () => {
    await adminInstance.get(ADMIN_CITIES).then(res =>{
      console.log(res.data)
      setCities(res.data)
    }).catch(err => console.log(`places fetch error : ${err.message}`))
  }
  useEffect(() => {
    places()
  }, [])
  const color1 = useColorModeValue('white', 'gray.800')
  return (
    <>
      {
        loading ?
          <Spinner />
          :
          <>
            <Center><Add
              setLoading={setLoading}
            /></Center>

            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              mt={35}
              gap={6}
              px={4}
            >
              {cities && cities.map((elem, i) => {
                return (
                  <Box
                    key={i}
                    role={'group'}
                    p={6}
                    maxW={'330px'}
                    w={'full'}
                    bg={color1}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}>
                    <Box
                      rounded={'lg'}
                      mt={-12}
                      pos={'relative'}
                      height={'230px'}
                      _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${elem?.photo})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                      }}
                      _groupHover={{
                        _after: {
                          filter: 'blur(20px)',
                        },
                      }}>
                      <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'cover'}
                        src={elem?.photo}
                      />
                    </Box>
                    <Stack pt={10} align={'center'}>
                      <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        City
                      </Text>
                      <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {elem?.city}
                      </Heading>
                      <Stack direction={'row'} align={'center'}>
                        <Button color={'gray.600'}>
                          Update Image
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                )
              })

              }
            </Grid>
          </>
      }
    </>
  );
}
