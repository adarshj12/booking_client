import React,{useEffect, useState} from 'react'
import NavBar from '../../../components/user/NavBar/NavBar'
import Nav from '../../../components/user/Profile/ProfileNav'
// import Content from '../../../components/user/Chat/Message'
import Footer from '../../../components/user/Footer/Footer'
import axios from '../../../utils/axios'
import { GET_DETAIL_USER } from '../../../utils/API'
import jwtDecode from 'jwt-decode'
import Messenger from '../../Messenger/Messenger'

const MyBookings = () => {
    const [user,setUser]=useState('')
    const decode = jwtDecode(localStorage.getItem('userToken'));
    const getuser = async () => {
        const token = localStorage.getItem('userToken');
        await axios.get(`${GET_DETAIL_USER}/${decode.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
            console.log(res.data);
          setUser(res.data);
        }).catch((err) => {
          console.log(`error=> ${err.message}`)
        })
      }
      useEffect(()=>{
        getuser()
      },[])
    return (
        <>
            <NavBar />
            <Nav/>
                {/* <Content/> */}
                <Messenger user={user}/>
            {/* <Footer/> */}
        </>
    )
}

export default MyBookings