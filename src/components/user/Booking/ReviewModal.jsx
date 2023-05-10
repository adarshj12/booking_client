import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Text,
    Button,
    useDisclosure,
    Center,
    Textarea,
    Input,
    VStack
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { RATE_HOTEL } from '../../../utils/API';
import axios from '../../../utils/axios'
import { Toaster, toast } from 'react-hot-toast';
const BasicUsage = ({ hotel,hotelid,userid }) => {
    const [rating, setRating] = useState(0);
    const [title,setTitle] = useState('')
    const [review,setReview] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleStarClick = (index) => {
        setRating(index + 1);
    };
    const submitReview=async()=>{
        onClose()
        console.log(hotel,hotelid,userid,review,rating,title)
        const body={
            hotelId:hotelid,
            userId:userid,
            review,
            rating,
            title
        }
        const token = localStorage.getItem('userToken')
        await axios.post(RATE_HOTEL,body, { headers: { 'Authorization': `Bearer ${token}` } }).then(res=>{

        }).catch(err=>{
            toast.error(err.response.data.message)
        })
    }
    return (
        <>
            <Button rounded={'none'} onClick={onOpen}>Review</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontWeight={'bold'} fontStyle={'italic'}>Review {hotel}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <Box display="flex" mt="2" alignItems="center">
                                {Array(5)
                                    .fill('')
                                    .map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            boxSize={6}
                                            color={i < rating ? 'yellow.400' : 'gray.300'}
                                            cursor="pointer"
                                            mr={2}
                                            onClick={() => handleStarClick(i)}
                                        />
                                    ))}
                            </Box>
                        </Center>
                        <Center>
                            <Box display="flex" mt="2" alignItems="center">
                                <VStack>
                                <Input placeholder='enter title for review' onChange={(e)=>setTitle(e.target.value)}/>
                                <Textarea placeholder='enter your review here' onChange={(e)=>setReview(e.target.value)}/>
                                </VStack>
                            </Box>
                        </Center>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={submitReview}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
                <Toaster/>
            </Modal>
        </>
    )
}

export default BasicUsage;