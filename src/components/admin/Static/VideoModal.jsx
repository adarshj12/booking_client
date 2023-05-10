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
    Input
} from '@chakra-ui/react'
import axios from '../../../utils/axios'
import {adminInstance} from '../../../utils/axios'

import { CHANGE_BANNER } from '../../../utils/API';
import { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
const BasicUsage = ({ id }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const token = localStorage.getItem('adminToken')
    const [video, setvideo] = useState('')
    const handlevideoChange = (e) => {
        setvideo(e.target.files[0]);
    };
    const change = async () => {
        onClose()
        const formData=new FormData();
        formData.append('video',video)
        await adminInstance.put(`${CHANGE_BANNER}/${id}`,formData).then(
        ).catch(err => toast.error(err.message))
    }
    return (
        <>
            <Button onClick={onOpen} rounded={'none'} bg={'cyan.300'}>Change</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <VStack>
                                {video && (
                                    <video src={URL.createObjectURL(video)} autoPlay muted />
                                )}
                                <input type='file' onChange={(e) => handlevideoChange(e)} />
                            </VStack>
                        </Center>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => change()}>
                            submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
                <Toaster />
            </Modal>
        </>
    )
}

export default BasicUsage;