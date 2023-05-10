
import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Text,
    ModalCloseButton,
    ModalBody,
    useDisclosure,
    Flex,
    HStack,
    VStack,
    Box,
    Spacer,
    Checkbox
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';


const TransitionExample = ({ hotel, room, rate, days, number, hotelid, roomid, dateRange,maxCount ,address,photo}) => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [count, setCount] = useState(number)
    const [limit,setLimit] = useState(0)
    console.log('dssfdfdf',room,maxCount,'dssfdfdf')
    const reserve = async () => {
        onClose();
        const body = {
            hotelid, roomid, dateRange
        }
        navigate('/booking', { state: { hotel, room, rate, days, hotelid, roomid, dateRange ,count,address,photo } })
            //await axios.post(BOOK,body,{ headers: { "Content-Type": "application/json" } }).then(res=>console.log(res.data))
            .catch((err) => console.log(`error - ${err.message}`))
    }
    return (
        <>
            {/* <Button onClick={()=>onOpen(true)}>RESERVE</Button> */}
            <Button
                mt={10}
                colorScheme="teal"
                bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                color="white"
                variant="solid"
                onClick={onOpen}
            >
                Reserve
            </Button>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader position={'text-center'}>Your Selection</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>



                        <Flex flexDirection="column" gap={5}>
                            <VStack textAlign="center" alignItems="center" justifyContent="center">
                                <Text fontWeight={'bold'}>{hotel}</Text>
                                <Text mt={5}>{room}</Text>
                                <Text mt={5}>Rate : ₹{rate}</Text>
                                <Text mt={5}>Number of Days Stay : {days}</Text>
                                <Text mt={5}>Number of Rooms:</Text>
                                <HStack>
                                    <button className="optionCounterButton" onClick={() => setCount(count - 1)} disabled={count === 1}>-</button>
                                    <Text> {count}</Text>
                                    <button className="optionCounterButton" onClick={() => setCount(count + 1)} disabled={count === maxCount[room]}>+</button>
                                </HStack>
                            </VStack>

                            <Flex justify="center">
                                <Button
                                    colorScheme="blue"
                                    bgGradient="linear(to-r, blue.700, blue.800, blue.900)"
                                    color="white"
                                    variant="solid"
                                    fontWeight="bold"
                                    borderRadius="5px"
                                    width="100px"
                                    mt={4}
                                    mb={4}
                                    onClick={() => reserve()}
                                >
                                    BOOK
                                </Button>
                            </Flex>
                        </Flex>






                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TransitionExample;