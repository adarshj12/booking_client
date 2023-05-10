import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Center,
    useDisclosure,
    VStack,
    Image,
    Input,
} from '@chakra-ui/react'
import { useState } from 'react'
import axios from '../../../utils/axios'
import {adminInstance} from '../../../utils/axios'

import { CITY_IMAGE } from '../../../utils/API';
import { Toaster, toast } from 'react-hot-toast';

const BasicUsage = ({setLoading}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [city, setCity] = useState('')
    const [image, setImage] = useState('')
    
    const token = localStorage.getItem('adminToken')
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };
      const addImage=async()=>{
        onClose()
        setLoading(true)
        const formData=new FormData();
        formData.append('city',city);
        formData.append('image',image)
        await adminInstance.post(CITY_IMAGE,formData).then(()=>setLoading(false)).catch(err=>toast.error(err.message))
      }
    return (
        <>
            <Button onClick={onOpen} rounded={'none'} bg={'cyan.300'}>Add City Image</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <VStack>
                                {image && (
                                    <Image
                                        src={ URL.createObjectURL(image)}
                                    />
                                )}
                                <Input placeholder='Enter City Name' type='text' onChange={(e) => setCity(e.target.value)} />
                                <input type='file' onChange={(e) => handleImageChange(e)} />
                            </VStack>
                        </Center>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={()=>addImage()}>
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