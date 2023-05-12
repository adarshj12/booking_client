import React, { useEffect, useState } from 'react'
import { Box,TableContainer,Link, Flex,Center,Heading, Table, Tbody, Td, Th, Thead,Text, Tr, chakra, Button,Switch, Container } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FaArrowCircleRight,FaTrash} from 'react-icons/fa'
import axios from '../../../utils/axios'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GET_MY_BOOKINGS } from '../../../utils/API';
import jwtDecode from 'jwt-decode';

const LIMIT = 10;

const totalPages = (total, limit) => {
    const pages = [];
    for (let i = 1; i <= parseInt(total / limit); i++) {
        pages.push(i);
    }
    return pages;
}
const Main = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [bookings, setData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0)
    const [activePage, setActivePage] = useState(1);
    const token = localStorage.getItem('userToken');
    const decode = jwtDecode(token)
    const getData = async () => {
        // console.log('hi');
            await axios.get(`${GET_MY_BOOKINGS}?id=${decode.id}&page=${activePage}&size=${LIMIT}`, { headers: {  'Authorization': `Bearer ${token}` } }).then((res) => {
            // console.log(res);
            setData(res.data.records);

            }).catch((err) => {
                if (err.response.status === 403) {
                    localStorage.removeItem('userToken')
                    navigate('/login')
                  }
                console.log(`error=> ${err.message}`)
            })
    }

    useEffect(() => {
        getData();
    }, [])

    const viewBooking =(id)=>{
        console.log('booking id',id);
        navigate('/profile/booking',{state:id})
    }


    const pageArray = totalPages(totalUsers, LIMIT);
    let pagesToShow = pageArray;
    if (pageArray.length > 7) {
        pagesToShow = pageArray.slice(activePage - 4, activePage + 3);
        if (activePage < 5) {
            pagesToShow = pageArray.slice(0, 7);
        } else if (activePage > pageArray.length - 4) {
            pagesToShow = pageArray.slice(pageArray.length - 7);
        }
    }

    return (
        <>

<TableContainer p={10} bg={'chakra-body-bg'}>
                <Center>


                    <Box >



                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                {activePage !== 1 && <li className="page-item"
                                    onClick={() => setActivePage(activePage - 1)}
                                >
                                    <Link className="page-link"
                                        // to="javascript:void(null)"
                                        to="#"
                                        aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </Link>
                                </li>}
                                {totalPages(totalUsers, LIMIT).map(pageNo =>
                                    <li className={`page-item ${pageNo === activePage ? `active` : ``}`} key={pageNo}
                                        onClick={() => setActivePage(pageNo)}
                                    >
                                        <Link className="page-link"
                                            // to="javascript:void(null)"
                                            to="#"
                                        >
                                            {pageNo}</Link>
                                    </li>
                                )}
                                {activePage !== parseInt(totalUsers / LIMIT) && <li className="page-item"
                                    onClick={() => setActivePage(activePage + 1)}
                                >
                                    <Link className="page-link"
                                        // href="javascript:void(null)"
                                        to="#"
                                        aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </Link>
                                </li>}
                            </ul>
                        </nav>




                    </Box>


                </Center>
                <Table variant='simple'>
                    <Thead>
                        <Tr fontStyle={'italic'}>
                            <Th>Property</Th>
                            <Th>type</Th>
                            <Th>date</Th>
                            <Th>rate</Th>
                            <Th>status</Th>
                            <Th>rooms</Th>
                            <Th>checkin</Th>
                            <Th>checkout</Th>
                            <Th>view</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            bookings && bookings.map((elem, i) => {
                                return (
                                    <Tr key={elem._id}>
                                        <Td>{elem.hotel.name}</Td>
                                        <Td>{elem.hotel.type}</Td>
                                        <Td>{new Date(elem.booking_date).toDateString().slice(4,15)}</Td>
                                        <Td>{elem.rate}</Td>
                                        {
                                            elem.status==='confirmed'?
                                            <Td textColor={'green.200'}>Confirmed</Td>
                                            :
                                            <Td textColor={'red.200'}>Awaiting Confirmation</Td>
                                        }
                                        <Td>{elem.rooms.length}</Td>
                                        <Td>{new Date(elem.checkin).toDateString().slice(4,15)}</Td>
                                        <Td>{new Date(elem.checkout).toDateString().slice(4,15)}</Td>
                                        <Td> <Button onClick={() => viewBooking(elem._id)} >
                                            <FaArrowCircleRight color={'blue'} />
                                        </Button></Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
                <Toaster />
            </TableContainer>
        </>
    )
}

export default Main
