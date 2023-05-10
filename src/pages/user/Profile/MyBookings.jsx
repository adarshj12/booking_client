import React from 'react'
import NavBar from '../../../components/user/NavBar/NavBar'
import Nav from '../../../components/user/Profile/ProfileNav'
import Content from '../../../components/user/Booking/AllBookings'
import Footer from '../../../components/user/Footer/Footer'
const MyBookings = () => {
    return (
        <>
            <NavBar />
            <Nav/>
                <Content/>
            <Footer/>
        </>
    )
}

export default MyBookings