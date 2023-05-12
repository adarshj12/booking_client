import { Box, TableContainer,Link,Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, chakra, Button, ButtonGroup, Center, Text } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { FaTrash, FaArrowCircleRight } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import { GET_MY_HOTEL_BOOKINGS } from '../../../utils/API'
import { GET_ALL_MY_BOOKINGS } from '../../../utils/API'
import axios from '../../../utils/axios'
import jwtDecode from "jwt-decode";
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
    const [details, setDetails] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [activePage, setActivePage] = useState(1);

    const token = localStorage.getItem('clientToken');
    const decode = jwtDecode(token);
    const getMyHotelBookings = async () => {

        // console.log(decode);
        await axios.get(`${GET_MY_HOTEL_BOOKINGS}/${decode.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
            //console.log(res.data);
            setBookings(res.data)
        }).catch((err) => {
            console.log(`error=> ${err.message}`)
        })
    }

    const list = async () => {
        await axios.get(`${GET_ALL_MY_BOOKINGS}/${decode.id}/${activePage}/${LIMIT}`, { headers: { 'Authorization': `Bearer ${token}` } }).then(res => {
            // console.log(res.data.records);
            setBookings(res.data.records);
            setTotalUsers(res.data.total)
        }).catch(err => console.log(err.message))
    }
    console.log(bookings)

    useEffect(() => {
        // getMyHotelBookings()
        list()
    }, [activePage])


    const userBooking = (id) => {
        console.log(id)
        navigate('/client/userbooking', { state: id })
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
                            <Th>Guest</Th>
                            <Th>Date</Th>
                            <Th>City</Th>
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
                                        <Td>{elem.user.username}</Td>
                                        <Td>{new Date(elem.booking_date).toDateString().slice(4, 15)}</Td>
                                        <Td>{elem.hotel.city}</Td>
                                        <Td>{new Date(elem.checkin).toDateString().slice(4, 15)}</Td>
                                        <Td>{new Date(elem.checkout).toDateString().slice(4, 15)}</Td>
                                       

                                      
                                        <Td> <Button onClick={() => userBooking(elem._id)} >
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

export default BookingList;



// for sorting table

// import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, useSortBy } from "@chakra-ui/react";
// import { useMemo } from "react";

// function BookingsTable(props) {
//   const { bookings } = props;

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Booking ID",
//         accessor: "id",
//       },
//       {
//         Header: "User",
//         accessor: "user",
//       },
//       {
//         Header: "Hotel",
//         accessor: "hotel",
//       },
//       {
//         Header: "Date",
//         accessor: "date",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//       },
//     ],
//     []
//   );

//   const data = useMemo(
//     () =>
//       bookings.map((booking) => ({
//         id: booking.id,
//         user: booking.user,
//         hotel: booking.hotel,
//         date: booking.date,
//         status: booking.status,
//       })),
//     [bookings]
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useSortBy(
//     {
//       columns,
//       data,
//     }
//   );

//   return (
//     <Box p={4}>
//       <Flex>
//         <Box ml={4} flex={1}>
//           <Box bg="white" p={4} rounded="lg" shadow="md" mb={4}>
//             <Heading size="md" mb={2}>
//               Bookings
//             </Heading>
//             <Table {...getTableProps()}>
//               <Thead>
//                 {headerGroups.map((headerGroup) => (
//                   <Tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map((column) => (
//                       <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                         {column.render("Header")}
//                         <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
//                       </Th>
//                     ))}
//                   </Tr>
//                 ))}
//               </Thead>
//               <Tbody {...getTableBodyProps()}>
//                 {rows.map((row) => {
//                   prepareRow(row);
//                   return (
//                     <Tr {...row.getRowProps()}>
//                       {row.cells.map((cell) => (
//                         <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
//                       ))}
//                     </Tr>
//                   );
//                 })}
//               </Tbody>
//             </Table>
//           </Box>
//         </Box>
//       </Flex>
//     </Box>
//   );
// }

// export default BookingsTable;
