import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Center, Link, TableContainer, Table, Tbody, Td, Th, Thead, Tr, chakra, Button, Switch } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTrash } from 'react-icons/fa'
import axios from '../../../utils/axios'
import { adminInstance } from '../../../utils/axios'

import { getAllClients } from '../../../utils/API'
import { DELETE_CLIENT } from '../../../utils/API'
import { blockClient } from '../../../utils/API';
import { verifyClient } from '../../../utils/API';
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
const LIMIT = 10;

const totalPages = (total, limit) => {
    const pages = [];
    for (let i = 1; i <= parseInt(total / limit); i++) {
        pages.push(i);
    }
    return pages;
}
const Main = () => {
    const navigate = useNavigate()
    const [userList, setData] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0)
    const [activePage, setActivePage] = useState(1);
    const users = async () => {
        await adminInstance.get(`${getAllClients}?page=${activePage}&size=${LIMIT}`).then((res) => {
            // console.log(res);
            setData(res.data.records);

        }).catch((err) => {
            console.log(`error=> ${err.message}`)
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
        users();
    }, [activePage])
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
                await adminInstance.delete(`${DELETE_CLIENT}/${id}`).then((res) => {
                }).catch((err) => {
                    console.log(`error=> ${err.message}`)
                })
                toast.error('user deleted');
            }
        })

    }
    const handleVerification = async (id, status) => {
        await adminInstance.get(`${verifyClient}/${id}`).then((res) => {
            status ? toast.error('client unverifed!') : toast.success('client verifed! ')

        }).catch((err) => {
            console.log(`error=> ${err.message}`)
        })
    }
    const handleBlock = async (id, status) => {
        console.log(id);
        await adminInstance.get(`${blockClient}/${id}`).then((res) => {
            status ? toast.success('client unblocked!') : toast.error('client blocked!')


        }).catch((err) => {
            console.log(`error=> ${err.message}`)
        })
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
                            <Th>verification</Th>
                            {/* <Th>action</Th> */}
                            <Th>status</Th>
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
                                        <Td>
                                            <Switch
                                                colorScheme={elem?.verified ? 'green' : null}
                                                size="sm"
                                                isChecked={elem?.verified}
                                                onChange={() => handleVerification(elem._id, elem?.verified)}
                                            />
                                        </Td>

                                        <Td> <Switch
                                            colorScheme={elem.status ? 'green' : 'red'}
                                            size="sm"
                                            isChecked={elem.status}
                                            onChange={() => handleBlock(elem._id, elem.status)}
                                        /></Td>
                                        {/* <Td> <Button onClick={() => userProfile(elem._id)} >
                                            <FaArrowCircleRight color={'blue'} />
                                        </Button></Td> */}

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
