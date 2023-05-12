import { Box, Flex, Heading, Text, VStack, HStack, Grid, Table, Th, Tbody, Thead, Tr, Avatar, Td } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getAllProperties } from '../../../utils/API'
import { GET_MY_HOTEL_BOOKINGS } from '../../../utils/API'
import axios from '../../../utils/axios'
import jwtDecode from "jwt-decode";

const ClientDashboard = () => {
  const [list, setList] = useState()
  const [bookings, setBookings] = useState([])

  const getProperties = async () => {
    try {
      const token = localStorage.getItem('clientToken');
      const decode = jwtDecode(token);
   
      await axios.get(`${getAllProperties}/${decode.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {

        setList(res.data[res.data.length - 1])
      }).catch((err) => {
        console.log(`error=> ${err.message}`)
      })
    } catch (err) {
      console.log(`erroe => ${err.message}`)
    }
  }

  const getMyHotelBookings = async () => {
    try {
      const token = localStorage.getItem('clientToken');
      const decode = jwtDecode(token);
      await axios.get(`${GET_MY_HOTEL_BOOKINGS}/${decode.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
      
        setBookings(res.data[res.data.length - 1])
      }).catch((err) => {
        console.log(`error=> ${err.message}`)
      })
    } catch (err) {
      console.log(`erroe => ${err.message}`)
    }
  }

  useEffect(() => {
    getProperties()
    getMyHotelBookings()
  }, [])

  return (
    <Box p={4}>
      <Flex>

        <Box ml={4} flex={1}>
          <Box bg="white" p={4} rounded="lg" shadow="md" mb={4}>
            <Heading size="md" mb={2}>
              Recently Added Hotel
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Image</Th>
                  <Th> Name</Th>
                  <Th>Type</Th>
                  <Th>Place</Th>
                  <Th>Date Added</Th>
                </Tr>
              </Thead>
              <Tbody>

                <Tr >
                  <Td>
                    <Avatar size="md" src={list?.photos[0]?.image_url} />
                  </Td>
                  <Td>{list?.name}</Td>
                  <Td>{list?.type}</Td>
                  <Td>{list?.city}</Td>
                  <Td>2023-04-02</Td>

                </Tr>

              </Tbody>
            </Table>
          </Box>
          <Box bg="white" p={4} rounded="lg" shadow="md">
            <Heading size="md" mb={2}>
              Latest Booking
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Property</Th>
                  <Th> User</Th>
                  <Th>Type</Th>
                  <Th>Check-In</Th>
                  <Th>Check-Out</Th>
                  <Th>Date of Booking</Th>
                </Tr>
              </Thead>
              <Tbody>

                <Tr >
                 <Td>{bookings?.name}</Td>
                  <Td>{bookings?.output?.username}</Td>
                  <Td>{bookings?.type}</Td>
                  <Td>{new Date(bookings?.result?.checkin).toDateString()}</Td>
                  <Td>{new Date(bookings?.result?.checkout).toDateString()}</Td>
                  <Td>{new Date(bookings?.result?.booking_date).toDateString()}</Td>
                </Tr>

              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </Box>

  );
}

export default ClientDashboard;
