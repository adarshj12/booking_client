import React from 'react'
import { Box } from '@chakra-ui/react'
import NavBar from '../../../components/user/NavBar/NavBar'
import Footer from '../../../components/user/Footer/Footer'
import Nav from '../../../components/user/Profile/ProfileNav'
import Content from '../../../components/user/Booking/MyBooking'
const MyBookings = () => {
    return (
        <>
        
            <NavBar />
            <Nav />
            <Content />
            <Box as="footer" mt="auto">
                <Footer />
            </Box>

        </>
    )
}

export default MyBookings