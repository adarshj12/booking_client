import React, { useEffect, useState } from 'react'
import { Center,Link,Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, chakra, Button, TableContainer } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTrash, FaArrowCircleRight } from 'react-icons/fa'
import axios from '../../../utils/axios'
import { adminInstance } from '../../../utils/axios'
import { GET_ALL_PROPERTIES } from '../../../utils/API'
import Swal from 'sweetalert2';
import { deltehotel } from '../../../utils/API'
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const LIMIT = 10;

const totalPages = (total, limit) => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(total / limit); i++) {
        pages.push(i);
    }
    return pages;
}
const Main = () => {
    const navigate = useNavigate()
    const [hotelList, setData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0)
    const [activePage, setActivePage] = useState(1);
    const properties = async () => {
        const token = localStorage.getItem('adminToken')
        await adminInstance.get(`${GET_ALL_PROPERTIES}?page=${activePage}&size=${LIMIT}`).then((res) => {
            // console.log(res);
            setData(res.data.records);
            setTotalUsers(res.data.total)
        }).catch((err) => {
            if (err.response.status == 401 || err.response.status == 403) {
                toast.error(err.response.data.message)
                localStorage.removeItem('adminToken')
                navigate('/admin')
            } else {
                toast.error(err.response.data.message)
            }
        })
    }

    const deleteHotel = async (id, hotel) => {
        console.log(id);
        Swal.fire({
            title: `Are you sure you want to delete ${hotel}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem('adminToken');
                await adminInstance.delete(`${deltehotel}/${id}`).then((res) => {
                    Swal.fire(
                        'Deleted!',
                        'The property has been deleted.',
                        'success'
                    )
                }).catch((err) => {
                    console.log(`error=> ${err.message}`)
                })
            }
        })
    }
    useEffect(() => {
        properties();
    }, [activePage])


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
                            <Th>Hotelname</Th>
                            <Th>client</Th>
                            <Th>type</Th>
                            <Th>place</Th>
                            {/* <Th>action</Th> */}
                            <Th>view</Th>
                            <Th>delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            hotelList && hotelList.map((elem, i) => {
                                return (
                                    <Tr key={elem._id}>
                                        <Td>{elem.name}</Td>
                                        <Td>{elem.result.username}</Td>
                                        <Td>{elem.type}</Td>
                                        <Td>{elem.city}</Td>

                                        <Td> <Button onClick={() => navigate('/admin/propertydetail', { state: { data: elem._id } })} >
                                            <FaArrowCircleRight color={'blue'} />
                                        </Button></Td>
                                        <Td><Button
                                            onClick={() => deleteHotel(elem._id, elem.name)}
                                        >
                                            <FaTrash color={'red'} />
                                        </Button></Td>

                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Main
