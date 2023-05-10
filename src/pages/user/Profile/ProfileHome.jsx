import React from 'react'
import NavBar from '../../../components/user/NavBar/NavBar'
import Nav from '../../../components/user/Profile/ProfileNav'
import Content from '../../../components/user/Profile/Profile'
import Footer from '../../../components/user/Footer/Footer'
const ProfileHome = () => {
    return (
        <>
            <NavBar />
            <Nav/>
                <Content/>
            <Footer/>
        </>
    )
}

export default ProfileHome
