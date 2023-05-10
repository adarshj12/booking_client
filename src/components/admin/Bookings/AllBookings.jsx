import { Box, Link, Table, Tbody, Td, Th, Thead, Tr, TableContainer,  Center,HStack, Select, Spacer } from "@chakra-ui/react";
import { FaTrash, FaArrowCircleRight } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import { GET_ALL_BOOKINGS } from '../../../utils/API'
import { ADMIN_GET_BOOKINGS } from '../../../utils/API'
import axios from '../../../utils/axios' 
import {adminInstance} from '../../../utils/axios' 
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";


const LIMIT = 10;

const totalPages = (total, limit) => {
    const pages = [];
    for (let i = 1; i <= parseInt(total / limit); i++) {
        pages.push(i);
    }
    return pages;
}




const BookingList = () => {
    const navigate = useNavigate()
    const [bookings, setBookings] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [activePage, setActivePage] = useState(1);
    const [duration, setDuration] = useState('all')

    const token = localStorage.getItem('adminToken');

    const list = async (e) => {
        await adminInstance.get(`${ADMIN_GET_BOOKINGS}?page=${activePage}&size=${LIMIT}&duration=${e?e:'all'}`).then(res => {
            setBookings(res.data.records);
            setTotalUsers(res.data.total)
        }).catch(err => {
            if (err.response.status == 401 || err.response.status == 403) {
                toast.error(err.response.data.message)
                localStorage.removeItem('adminToken')
                navigate('/admin')
            } else {
                toast.error(err.response.data.message)
            }
        })
    }

    useEffect(() => {
        list()
    }, [activePage])

    const handleOptionChange = async (e) => {
        console.log(e);
        setDuration(e);
        list(e)
    };



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
                <HStack>


                    <Center>


                        <Box >



                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    {activePage !== 1 && <li className="page-item"
                                        onClick={() => setActivePage(activePage - 1)}
                                    >
                                        <Link className="page-link"
                                            to="#"
                                            aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </Link>
                                    </li>}
                                    {totalPages(totalUsers, LIMIT).map(pageNo =>
                                        <li className={`page-item ${pageNo === activePage ? `active` : ``}`} key={pageNo}
                                            onClick={() => {
                                                setActivePage(pageNo); 
                                                // list()
                                            }
                                            }
                                        >
                                            <Link className="page-link"
                                                to="#"
                                            >
                                                {pageNo}</Link>
                                        </li>
                                    )}
                                    {activePage !== parseInt(totalUsers / LIMIT) && <li className="page-item"
                                        onClick={() => setActivePage(activePage + 1)}
                                    >
                                        <Link className="page-link"
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
                    <Spacer />
                    <Box w={150}>
                        <Select onChange={(e)=>handleOptionChange(e.target.value)} >
                        <option value='all'  >Overall</option>
                            <option value='month' >This Month</option>
                            <option value='week'>This Week</option>
                        </Select>
                    </Box>
                </HStack>
                <Table variant='simple'>
                    <Thead>
                        <Tr fontStyle={'italic'}>
                            <Th>BOOKING NO.</Th>
                            <Th>Booking Date</Th>
                            <Th>Guest</Th>
                            <Th>client</Th>
                            <Th>city</Th>
                            <Th>hotel</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            bookings && bookings.map((elem, i) => {
                                return (
                                    <Tr key={elem._id}>
                                        <Td>{elem._id}</Td>
                                        <Td>{new Date(elem.booking_date)?.toDateString()?.slice(4, 15)}</Td>
                                        <Td>{elem.user.username}</Td>
                                        <Td>{elem.client.username}</Td>
                                        <Td>{elem.hotel.city}</Td>
                                        <Td>{elem.hotel.name}</Td>
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

export default BookingList;


