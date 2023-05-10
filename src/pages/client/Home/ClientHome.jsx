import React from 'react'
import ClientDashboard from '../../../components/client/Home/Main';
import ClientNavbar from '../../../components/client/NavBar/NavBar'
import Subnav from '../../../components/client/NavBar/SubNav'

const ClientHome = () => {
  return (
    <>
    <ClientNavbar/>
    <Subnav/>
    <ClientDashboard/>
    </>
  )
}

export default ClientHome;
