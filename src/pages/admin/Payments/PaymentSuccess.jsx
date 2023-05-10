import React from 'react'
import SidebarWithHeader from '../../../components/admin/Layout/Layout'
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useSearchParams, useNavigate } from 'react-router-dom'
const Success = () => {
    const searchQuery = useSearchParams()[0]
    console.log(searchQuery.get("reference"));
    const navigate = useNavigate()
    const refrence = searchQuery.get("reference");
    return (
        <>
            <SidebarWithHeader>
                <Box textAlign="center" py={10} px={6}>
                    <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
                    <Heading as="h2" size="xl" mt={6} mb={2}>
                        Payment Successful
                    </Heading>
                    <Text color={'gray.500'}>
                        Reference Number : {refrence}
                    </Text>
                    <Button
                        colorScheme="cyan"
                        mt={20}
                        bgGradient="linear(to-r, cyan.400, cyan.500, cyan.600)"
                        color="white"
                        variant="solid"
                        onClick={() => navigate('/admin/payments')}
                    >
                        Go to Payments
                    </Button>
                </Box>
            </SidebarWithHeader>
        </>

    )
}

export default Success