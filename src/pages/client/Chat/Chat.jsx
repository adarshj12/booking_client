import ClientNavbar from '../../../components/client/NavBar/NavBar'
import Subnav from '../../../components/client/NavBar/SubNav'
import React,{useEffect,useState} from 'react'
import { GET_CLIENT_DETAIL } from '../../../utils/API'
import axios from '../../../utils/axios'
import jwtDecode from 'jwt-decode'
import Messenger from '../../Messenger/Messenger'


const BookingsList = () => {
  const [user,setUser]=useState('')
    const decode = jwtDecode(localStorage.getItem('clientToken'));
    const getuser = async () => {
        const token = localStorage.getItem('clientToken');
        await axios.get(`${GET_CLIENT_DETAIL}/${decode.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
            // console.log(res.data);
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
    <ClientNavbar/>
    <Subnav/>
    <Messenger user={user}/>
    </>
  )
}

export default BookingsList
