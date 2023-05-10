import { Table, Thead, Tbody, Tr, Th, Td, Avatar, Flex, Box, Heading, HStack, Button, TableContainer } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getAllProperties } from '../../../utils/API'
import {deltehotel} from '../../../utils/API'
import axios from '../../../utils/axios'
import jwtDecode from "jwt-decode";
import { FaArrowAltCircleRight, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';


const AllProperty = () => {
    const [list, setList] = useState([])


    const navigate = useNavigate();

    const getProperties = async () => {
        try {
            const token = localStorage.getItem('clientToken');
            const decode = jwtDecode(token);
            // console.log(decode);
            await axios.get(`${getAllProperties}/${decode.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                // console.log(res);
                setList(res.data)
            }).catch((err) => {
                console.log(`error=> ${err.message}`)
            })
        } catch (err) {
            console.log(`erroe => ${err.message}`)
        }
    }
// console.log(list)

    useEffect(() => {
        getProperties()
    },[list])

    const deleteProperty=(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('clientToken');
                    const decode = jwtDecode(token);
                    // console.log(decode);
                    await axios.delete(`${deltehotel}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                        // setList(res.data)
                    }).catch((err) => {
                        console.log(`error=> ${err.message}`)
                    })
                } catch (err) {
                    console.log(`erroe => ${err.message}`)
                }
              Swal.fire(
                'Deleted!',
                'The property has been deleted.',
                'success'
              )
            } 
          })
          
    }

    return (
        <>
        <TableContainer  bg={'chakra-body-bg'}>

        
                        <HStack justifyContent="space-between">
                                <Heading size="md" mb={2}>
                                    All Properties
                                </Heading>
                                <Button onClick={() => navigate('/client/add')}>
                                    Add
                                </Button>
                            </HStack>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        <Th>Image</Th>
                                        <Th> Name</Th>
                                        <Th>Type</Th>
                                        <Th>Place</Th>
                                        <Th>Date Added</Th>
                                        <Th>View</Th>
                                        <Th>Delete</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        list && list.map((elem, i) => {
                                            return (
                                                <Tr key={i}>
                                                    <Td>
                                                        <Avatar size="md" src={elem.photos[0].image_url} />
                                                    </Td>
                                                    <Td>{elem.name}</Td>
                                                    <Td>{elem.type}</Td>
                                                    <Td>{elem.city}</Td>
                                                    <Td>2023-04-02</Td>
                                                    <Td><FaArrowAltCircleRight color='blue' 
                                                    onClick={()=>navigate('/client/view',{state:{data:elem._id}})}
                                                    /></Td>
                                                    <Td><FaTrash color='red'
                                                    onClick={()=>deleteProperty(elem._id)}
                                                    /></Td>

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

export default AllProperty;
