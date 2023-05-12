import { Table, Thead, Tbody, Tr, Th, Td, Avatar, Flex, Box, Heading, HStack, Button, Text, Center } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllProperties } from '../../../utils/API'
import { CANCELLATIONS } from '../../../utils/API'
import axios from '../../../utils/axios'
import jwtDecode from "jwt-decode";
import { FaAmazonPay } from 'react-icons/fa';
import Swal from 'sweetalert2';


const AllProperty = () => {
    const [list, setList] = useState([])
    const [none,setNone] = useState(false)

    const navigate = useNavigate();
    const token = localStorage.getItem('clientToken');
    const decode = jwtDecode(token);
    const getCancellations = async () => {
        await axios.get(`${CANCELLATIONS}?id=${decode.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
            //  console.log(res.data);
             if(res.data==='no cancellations'){
                setNone(true)
             }else{

                 setList(res.data)
             }
        }).catch((err) => {
            console.log(`error=> ${err.message}`)
        })
    }
    // console.log(list)

    useEffect(() => {
        getCancellations()
    }, [])



    return (
        <>
            <Box p={4} w={'full'}>
                <Flex>
                    <Box flex={1}>
                        <Box bg="white" p={4} rounded="lg" shadow="md" mb={4}>

                            <Heading size="md" mb={2}>
                                All Properties
                            </Heading>
                            {
                                !none ? <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>Property</Th>
                                            <Th>City</Th>
                                            <Th>GuestName</Th>
                                            <Th>Mobile</Th>
                                            <Th>Email</Th>
                                            <Th>Date of Booking</Th>
                                            <Th>Supposed Checkin</Th>
                                            <Th>Refund</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {list.map((elem, i) => {
                                            return (
                                                <Tr key={i}>
                                                    <Td>{elem?.name}</Td>
                                                    <Td>{elem?.city}</Td>
                                                    <Td>{elem?.user?.username}</Td>
                                                    <Td>{elem?.user?.mobile}</Td>
                                                    <Td>{elem?.user?.email}</Td>
                                                    <Td>{new Date(elem?.booking?.booking_date).toDateString().slice(4, 15)}</Td>
                                                    <Td>{new Date(elem?.booking?.checkin).toDateString().slice(4, 15)}</Td>
                                                    <Td><Button

                                                    ><FaAmazonPay color='blue' /></Button></Td>
                                                </Tr>
                                            )
                                        })

                                        }
                                    </Tbody>

                                </Table>
                                    :
                                    <Center>
                                        <Heading>No cancellations</Heading>
                                    </Center>
                            }
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </>

    );
}

export default AllProperty;
