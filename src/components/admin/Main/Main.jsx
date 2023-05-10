import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Table, Text, Thead, Tbody, Tr, Th, Td, Spacer, Stack, Center, VStack, HStack, Grid } from '@chakra-ui/react';
import { FaRupeeSign, FaUsers } from 'react-icons/fa';
import { TbBuildingBank } from 'react-icons/tb';
import Piechart from './Piechart'
import LineGraph from './LineGraph';
import { DASHBOARD } from '../../../utils/API';
import axios, { adminInstance } from '../../../utils/axios'
import { Toaster, toast } from 'react-hot-toast';

const Main = () => {

  const [payment, setPayment] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [users, setusers] = useState(0)
  const [properties, setproperties] = useState(0)
  const [total, settotal] = useState(0)
  const token = localStorage.getItem('adminToken');
  const dashboardData = async () => {
    await adminInstance.get(DASHBOARD).then(res => {
      console.log(res.data.payment);
      console.log(res.data.revenue);
      setPayment(res.data.payment);
      setRevenue(res.data.revenue);
      setusers(res.data.users)
      setproperties(res.data.properties)
      settotal(res.data.total[0].totalRate)
    }).catch(err => {
      toast.error(err.message)
    })
  }

  useEffect(() => {
    dashboardData()
  }, [])
  return (
    <>
      <Box p={4}>
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={4}>
          <Box bg="white" p={4} rounded="lg" shadow="md">
            <Stack direction="column" spacing={2} align="center">
              <Text fontWeight="extrabold">Total Users</Text>
              <HStack>
                <FaUsers fontSize={40} />
                <Heading as="h2" fontSize="2xl" fontStyle="italic">
                  {users}
                </Heading>
              </HStack>
            </Stack>
          </Box>

          <Box bg="white" p={4} rounded="lg" shadow="md">
            <Stack direction="column" spacing={2} align="center">
              <Text fontWeight="extrabold">Total Properties</Text>
              <HStack>
                <TbBuildingBank fontSize={40} />
                <Heading as="h2" fontSize="2xl" fontStyle="italic">
                  {properties}
                </Heading>
              </HStack>
            </Stack>
          </Box>

          <Box bg="white" p={4} rounded="lg" shadow="md">
            <Stack direction="column" spacing={2} align="center">
              <Text fontWeight="extrabold">Total Revenue</Text>
              <HStack>
                <FaRupeeSign fontSize={40} />
                <Heading as="h2" fontSize="2xl" fontStyle="italic">
                  {total * 0.2}
                </Heading>
              </HStack>
            </Stack>
          </Box>
        </Grid>
        <Box maxW="100%" overflowX="auto">
          <Grid
            templateColumns={['1fr', '1fr', '1fr 1fr']}
            gap={4}
            mt={[4, 8, 12]}
            px={[4, 8]}
          >
            <Box
              bg="white"
              p={4}
              rounded="lg"
              shadow="md"
              textAlign={['center', 'left']}
              mb={[4, 0]}
            >
              <Text fontWeight="extrabold">Payment Mode</Text>
              <Piechart payment={payment} />
            </Box>

            <Box
              bg="white"
              p={4}
              rounded="lg"
              shadow="md"
              textAlign={['center', 'right']}
            >
              <Text fontWeight="extrabold">Revenue</Text>
              <LineGraph revenue={revenue} />
            </Box>
          </Grid>
        </Box>




        <Toaster />
      </Box>


    </>
  )
}

export default Main
