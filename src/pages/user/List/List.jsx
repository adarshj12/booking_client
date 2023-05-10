import React,{ useEffect,useState } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import NavBar from '../../../components/user/NavBar/NavBar'
import { Heading } from '@chakra-ui/react'
import SearchBox from '../../../components/user/Search/SearchBar'
import SearchItem from '../../../components/user/Search/Search'
import Footer from '../../../components/user/Footer/Footer'
import {GETLIST} from '../../../utils/API'
import axios from '../../../utils/axios'
import { useSelector } from "react-redux";
const List = () => {
  const [data,setData]= useState([])
  const destination = useSelector(state=>state.search.city)
  const getSearchList=async()=>{
    try {
      await axios.get(`${GETLIST}?city=${destination}`).then((res)=>{
        // console.log(res);
        setData(res.data)
      }).catch((err)=>{
        console.log(`response not recieved ->${err}`);
      })
    } catch (error) {
      console.log(`Fetch Error -> ${error}`);
    }
  }
  getSearchList();
  return (
    <>
    <Box  position={'sticky'} top={0} zIndex={1}>

      <NavBar/>
    </Box>
    <Flex mt="20px">
      {/* <Flex flex="1" position="sticky" top="80px" p={5}>
        <SearchBox/>
      </Flex> */}
      <Flex flex="2" ml="20px" flexWrap="wrap" justifyContent="flex-start">
        {/* <SearchItem data={data} /> */}
        {/* <SearchItem/>
        <SearchItem/>
        <SearchItem/>
        <SearchItem/>
        <SearchItem/> */}
      </Flex>
    </Flex>
    <SearchItem data={data} />
    <Footer/>

    
    </>
  )
}

export default List
