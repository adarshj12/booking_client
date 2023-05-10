import React from 'react'
import SidebarWithHeader from '../../../components/admin/Layout/Layout'
import Content from '../../../components/admin/Bookings/AllBookings'
const AdminViewBookings = () => {
  return (
    <>
    <SidebarWithHeader>
      <Content/>
    </SidebarWithHeader>
    </>
    
  )
}

export default AdminViewBookings