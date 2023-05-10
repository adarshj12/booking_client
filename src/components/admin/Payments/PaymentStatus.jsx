import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr, chakra, Button, Center, Text, TableContainer, HStack ,Link} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { useTable, useSortBy } from 'react-table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTrash, FaAmazonPay } from 'react-icons/fa'
import axios from '../../../utils/axios'
import {adminInstance} from '../../../utils/axios'
import { SHOW_PAYMENT_STATUS } from '../../../utils/API'
import { PAY_CLIENT } from '../../../utils/API'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import logo from '../../../../src/assets/logo.jpg'

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
    const [paymentStatus, setPaymentStatus] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const token = localStorage.getItem('adminToken')
    const payments = async () => {

        await adminInstance.get(`${SHOW_PAYMENT_STATUS}/${activePage}/${LIMIT}`).then((res) => {
            setPaymentStatus(res.data.records);
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

    useEffect(() => {
        payments();
    }, [paymentStatus])

    //  console.log(paymentStatus);

    const handlePayment = async (id, share, payid, clientname) => {
        const body = {
            id,
            share,
            payid
        }
        await adminInstance.put(`${PAY_CLIENT}`, body).then((res) => {
            // if(res.status===200)  toast.success('payment successful');
        }).catch(err => toast.error(err.message))
        const amount = share;
        const { data: { key } } = await axios.get(`/getKey`)

        const { data: { order } } = await axios.post(`/admin/checkout`, {
            amount
        })
        const options = {
            key: key,
            amount: order.amount,
            currency: "INR",
            name: clientname,
            description: "Booking Application",
            image: logo,
            order_id: order.id,
            callback_url: `http://localhost:4000/api/v1/admin/verification`,
            prefill: {
                "name": "bookn'stay admin",
                "email": 'booknstay@gmail.com',
                "contact": `+91$9898989898`
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#030505"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open()
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
                                        // href="javascript:void(null)"
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
                                            // href="javascript:void(null)"
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
                            <Th>BOOKING NO.</Th>
                            <Th>Clientname</Th>
                            <Th>booking date</Th>
                            <Th>booking amount</Th>
                            <Th>client share</Th>
                            <Th>status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            paymentStatus && paymentStatus.map((elem, i) => {
                                return (
                                    <Tr key={elem.booking._id}>
                                        <Td>{elem.booking._id}</Td>
                                        <Td>{elem.client.username}</Td>
                                        <Td>{new Date(elem.booking.booking_date)?.toDateString()?.slice(4, 15)}</Td>
                                        <Td>{elem.client.username}</Td>
                                        <Td>{elem.booking_amount}</Td>
                                        <Td>{elem.client_share}</Td>
                                        {elem.status === 'paid' ? (
                                            <Td> <Text>Paid</Text></Td>
                                        ) : (
                                            <Td>

                                                <Button>
                                                    <FaAmazonPay color={'blue'}
                                                        onClick={() => handlePayment(elem.client._id, elem.client_share, elem._id,elem.client.username)}
                                                    />
                                                </Button>
                                            </Td>
                                        )}
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
