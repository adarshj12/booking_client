import React from 'react'
import ClientNavbar from '../../../components/client/NavBar/NavBar'
import Subnav from '../../../components/client/NavBar/SubNav'
import Content from '../../../components/client/Property/AddRooms'


const AddRoom=()=>{
    return (
        <>
            <ClientNavbar/>
            <Subnav/>
            <Content/>
        </>
    )
}

export default AddRoom;