import {
    Box,
    Flex,
    Button,
} from '@chakra-ui/react';
import {useNavigate } from 'react-router-dom';
import { CLIENT_VERIFICATION_STATUS } from '../../../utils/API'
import axios from '../../../utils/axios'
import jwtDecode from "jwt-decode";
import { toast, Toaster } from 'react-hot-toast'


function Subnavbar() {
    const token = localStorage.getItem('clientToken');
    const navigate = useNavigate()
    const decode = jwtDecode(token);
    const checkVerification = async (href) => {
        await axios.get(`${CLIENT_VERIFICATION_STATUS}/${decode.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
            console.log(res.data.message)
            if (res.data.message) {
                navigate(href);
            }
            else toast.error('you are not verified')
        }).catch(err => {
            console.log(err.message)
        })
    }
    return (
        <Flex
            bg="gray.100"
            w="100%"
            p={4}
            alignItems="center"
            justifyContent="center"
            position="sticky"
            top={0}
        >
            <Box mx={4}>
                <Button variant="ghost" onClick={() => checkVerification('/client/property')}>Properties</Button>
            </Box>
            <Box mx={4}>
                <Button variant="ghost" onClick={() => checkVerification('/client/bookings')}>Bookings</Button>
            </Box>
            <Box mx={4}>
                <Button variant="ghost" onClick={() => checkVerification('/client/fianace')}>Finance</Button>
            </Box>
            <Box mx={4}>
                <Button variant="ghost" onClick={() => checkVerification('/client/cancel')}>Cancelations</Button>
            </Box>
            <Box mx={4}>
                <Button variant="ghost" onClick={() => checkVerification('/client/chat')}>Chat Requests</Button>
            </Box>
            <Toaster />
        </Flex>
    );
}

export default Subnavbar;

