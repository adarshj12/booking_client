import Bookings from '../../../components/client/Bookings/Bookings'
import ClientNavbar from '../../../components/client/NavBar/NavBar'
import Subnav from '../../../components/client/NavBar/SubNav'
import React from 'react'

const BookingsList = () => {
  return (
    <>
    <ClientNavbar/>
    <Subnav/>
    <Bookings/>
    </>
  )
}

export default BookingsList
