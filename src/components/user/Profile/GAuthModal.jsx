import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    InputLeftElement,
    Button,
    Input,
    useDisclosure,
    InputGroup,
    Text
} from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons'
import axios from '../../../utils/axios';
import { UPDATE_MOBILE } from '../../../utils/API'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/userSlice';
import { FaGoogle } from 'react-icons/fa';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import toast, { Toaster } from "react-hot-toast";
const BasicUsage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [mobile, setMobile] = useState('');
    const [mobileError, setMobileError] = useState(false)
    const token =localStorage.getItem('userToken')
    const decode = jwtDecode(token);
    const [flag, setFlag] = useState(true);
    useEffect(() => {
        if (flag) {
            onOpen();
        }
    }, [flag, onOpen]);


    const handleMobileChange = (value) => {
        if (!value.match(/^\d{10}$/)) {
            setMobileError(true)
        } else {
            setMobileError(false)
            setMobile(value);
        }
    }

    const handleMobile=async()=>{
        if(mobile===''||mobileError) toast.error('enter correct mobile number')
        else{
            onClose()
            await axios.put(`${UPDATE_MOBILE}/${decode.id}`,{mobile},{ headers: { 'Authorization': `Bearer ${token}` } }).then(res=>{
                    console.log(res.data.user);
                    dispatch(login({
                        user: res.data.user.username,
                        mobile:res.data.user.mobile,
                        token
                    }))
                toast.success('mobile updated')
            }
                ).catch(err=>toast.error(err.message))
        }
    }


    return (
        <>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>You have Logged In With Google, Please Enter Your Mobile Number for booking</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<PhoneIcon color='gray.300' />}
                            />
                            <Input type='tel' placeholder='Phone number' onChange={(e) => handleMobileChange(e.target.value)} />
                            {mobileError && <Text color={'red'}>Enter a valid Mobile Number excluding +91</Text>}
                        </InputGroup>
                    </ModalBody>

                    <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={() => handleMobile()}>
                                Click !
                            </Button>

                    </ModalFooter>
                </ModalContent>
                <Toaster />
            </Modal>
        </>
    )
}

export default BasicUsage;