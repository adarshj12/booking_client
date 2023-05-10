import React, { useEffect, useState } from 'react'
import { Box,Center,Link, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, chakra, Button, Switch, Container, TableContainer } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTrash, FaArrowCircleRight } from 'react-icons/fa'
import axios from '../../../utils/axios'
import { adminInstance } from '../../../utils/axios'

import { getAllUsers } from '../../../utils/API'
import { blockUser } from '../../../utils/API'
import { DELETE_USER } from '../../../utils/API'
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../../redux/adminSlice';
import { useDispatch } from 'react-redux';


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
    const [userList, setData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0)
    const [activePage, setActivePage] = useState(1);
    const users = async () => {
        try {
            await adminInstance.get(`${getAllUsers}?page=${activePage}&size=${LIMIT}`).then((res) => {
                console.log(res);
                setData(res.data.records);

            }).catch((err) => {
                console.log(`error=> ${err.message}`)
            })
        } catch (err) {
            console.log(`erroe => ${err.message}`)
        }
    }

    const deleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await adminInstance.delete(`${DELETE_USER}/${id}`).then((res) => {
                }).catch((err) => {
                    console.log(`error=> ${err.message}`)
                })
                toast.error('user deleted');
            }
        })

    }
    useEffect(() => {
        users();
        // console.log(userList)
    }, [userList])

    // console.log(userList);

    const handleBlock = async (id, val) => {
        console.log(id, val);
        await adminInstance.get(`${blockUser}/${id}`).then((res) => {
            val ? toast.success('user unblocked') : toast.error('user blocked')
        }).catch((err) => {
            console.log(`error=> ${err.message}`)
        })
    }
    const userProfile = (id) => {
        console.log(id);
        navigate('/admin/userdetail', { state: { data: id } })
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
                            <Th>Username</Th>
                            <Th>mobile</Th>
                            <Th>email</Th>
                            <Th>status</Th>
                            {/* <Th>action</Th> */}
                            <Th>view</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            userList && userList.map((elem, i) => {
                                return (
                                    <Tr key={elem._id}>
                                        <Td>{elem.username}</Td>
                                        <Td>{elem.mobile}</Td>
                                        <Td>{elem.email}</Td>
                                        <Td> <Switch
                                            colorScheme={elem.status ? 'green' : 'red'}
                                            size="sm"
                                            isChecked={elem.status}
                                            onChange={() => handleBlock(elem._id, elem.status)}
                                        /></Td>
                                        <Td> <Button onClick={() => userProfile(elem._id)} >
                                            <FaArrowCircleRight color={'blue'} />
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
