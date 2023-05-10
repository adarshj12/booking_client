import Cancellations from '../../../components/client/Cancellation/Cancellations'
import ClientNavbar from '../../../components/client/NavBar/NavBar'
import Subnav from '../../../components/client/NavBar/SubNav'
import React from 'react'

const CancellationsList = () => {
  return (
    <>
    <ClientNavbar/>
    <Subnav/>
    <Cancellations/>
    </>
  )
}

export default CancellationsList
