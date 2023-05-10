import React from 'react'
import ClientNavbar from '../../../components/client/NavBar/NavBar'
import Subnav from '../../../components/client/NavBar/SubNav'
import AddNewProp from '../../../components/client/Property/AddProperty'


const AddProperty=()=>{
    return (
        <>
            <ClientNavbar/>
            <Subnav/>
            <AddNewProp/>
        </>
    )
}

export default AddProperty;