import React from 'react'
import Footer from '../../../components/user/Footer/Footer'
import NavBar from '../../../components/user/NavBar/NavBar'
import Booking from '../../../components/user/Booking/Booking'
import { Box } from '@chakra-ui/react'

const Home = () => {
    return (
        <>
            <Box minHeight="100vh" display="flex" flexDirection="column">
                <Box flex="1">
                    <NavBar />
                    <Booking/>
                </Box>
                <Box as="footer" mt="auto">
                    <Footer />
                </Box>
            </Box>
        </>

    )
}

export default Home
