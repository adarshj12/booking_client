import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spacer,
  CardBody,
  Card,
  Avatar,
  Flex,
  Box,
  Heading,
  HStack,
  Text,
  Button,
  TableContainer,
  TableCaption,
  Tfoot,
  Badge,
  Center
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { GET_ALL_MY_BOOKINGS } from '../../../utils/API'
import { GET_EARNINGS } from '../../../utils/API'
import { CHANGE_STATUS } from '../../../utils/API'
import axios from '../../../utils/axios'
import jwtDecode from "jwt-decode";

const LIMIT = 10;

const totalPages = (total, limit) => {
  const pages = [];
  for (let i = 1; i <= parseInt(total / limit); i++) {
    pages.push(i);
  }
  return pages;
}

const Finance = () => {
  const [bookings, setBookings] = useState([])
  const [details, setDetails] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [activePage, setActivePage] = useState(1);
  const [earnings,setEarnings] = useState(0);

  const token = localStorage.getItem('clientToken');
  const decode = jwtDecode(token);


  const list = async () => {
    await axios.get(`${GET_ALL_MY_BOOKINGS}/${decode.id}/${activePage}/${LIMIT}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
      // console.log(res.data.records);
      setBookings(res.data.records);
      setTotalUsers(res.data.total)
    }).catch(err => console.log(err.message))
  }

  const getEarnings = async()=>{
    await axios.get(`${GET_EARNINGS}/${decode.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res=>{
      if(res.status===200) setEarnings(res.data)
    }).catch(err=>console.log(err.message))
  }
  useEffect(() => {
    list()
    getEarnings()
  }, [activePage])

  const changeStatus =async(id)=>{
    console.log(id);
    axios.get(`${CHANGE_STATUS}/${id}`,{ headers: { 'Authorization': `Bearer ${token}` } }).then(res=>console.log(res))
    .catch(err=>console.log(err.message))
  }

  return (
    <>
      <Flex p={10}>
        <Box p='4' >
          <Heading>Reservation Stats</Heading>
        </Box>
        <Spacer />
        <Box p='4' >
          <Card>
            <CardBody>
              <Text fontWeight={900}>Total Earnings</Text>
              <Text>₹ {earnings}</Text>
            </CardBody>
          </Card>
        </Box>
      </Flex>
      <Center>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {activePage !== 1 && <li className="page-item"
              onClick={() => setActivePage(activePage - 1)}
            >
              <a className="page-link"
                // href="javascript:void(null)"
                href="#"
                aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>}
            {totalPages(totalUsers, LIMIT).map(pageNo =>
              <li className={`page-item ${pageNo === activePage ? `active` : ``}`} key={pageNo}
                onClick={() => setActivePage(pageNo)}
              >
                <a className="page-link"
                  // href="javascript:void(null)"
                  href="#"
                >
                  {pageNo}</a>
              </li>
            )}
            {activePage !== parseInt(totalUsers / LIMIT) && <li className="page-item"
              onClick={() => setActivePage(activePage + 1)}
            >
              <a className="page-link"
                // href="javascript:void(null)"
                href="#"
                aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>}
          </ul>
        </nav>

      </Center>
      <TableContainer p={10}>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th>Guest Name</Th>
              <Th>Check-In</Th>
              <Th>Check-Out</Th>
              <Th>City</Th>
              <Th>Action</Th>
              <Th>Credit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              bookings && bookings.map((elem, i) => {
                return (
                  <Tr key={i}>
                    <Td>{elem.hotel.name}</Td>
                    <Td>{elem.user.username}</Td>
                    <Td>{new Date(elem.checkin).toDateString().slice(4, 15)}</Td>
                    <Td>{new Date(elem.checkout).toDateString().slice(4, 15)}</Td>
                    <Td>{elem.hotel.city}</Td>
                    {elem.status==='confirmed'?<Td>
                      <Badge variant='outline' colorScheme='green'>
                        Confirmed
                      </Badge> 
                    </Td>:
                    <Td><Button bg={'blue.300'} fontStyle={'italic'} rounded={'none'} h={35} w={75}
                    onClick={()=>changeStatus(elem._id)}
                    >Confirm ?</Button></Td>
                    }
                   { elem.result.status==='paid'?
                   <Td><Badge colorScheme='green'>Recieved</Badge></Td>
                  :<Td><Badge colorScheme='red'>Due</Badge></Td>
                  }
                   
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </>

  );
}

export default Finance;
<Th>Check-In</Th>