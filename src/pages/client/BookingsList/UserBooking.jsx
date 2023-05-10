import UserBooking from '../../../components/client/Bookings/UserBooking'
import ClientNavbar from '../../../components/client/NavBar/NavBar'
import Subnav from '../../../components/client/NavBar/SubNav'
import React from 'react'

const BookingsList = () => {
  return (
    <>
    <ClientNavbar/>
    <Subnav/>
    <UserBooking/>
    </>
  )
}

export default BookingsList
