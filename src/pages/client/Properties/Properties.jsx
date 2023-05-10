import React from 'react'
import ClientNavbar from '../../../components/client/NavBar/NavBar'
import Subnav from '../../../components/client/NavBar/SubNav'
import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import AllProperty from '../../../components/client/Property/AllProperty'

const Properties = () => {
  return (
    <>
    <ClientNavbar/>
    <Subnav/>
    <VStack>
        <AllProperty/>
    </VStack>
    </>
  )
}

export default Properties
