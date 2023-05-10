
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    Avatar,
    useColorModeValue,
    Image,
    Button
} from '@chakra-ui/react';
import axios from '../../../utils/axios'
import {adminInstance} from '../../../utils/axios'

import { ADMIN_BANNER } from '../../../utils/API';
import Change from './VideoModal'
import { useEffect, useState } from 'react';
export default function BlogPostWithImage() {
    const token = localStorage.getItem('adminToken')
    const [video,setVideo]=useState('')
    const banner=async()=>{
        await adminInstance.get(ADMIN_BANNER).then(res => setVideo(res.data)).catch(err => console.log(`places fetch error : ${err.message}`))
    }
    useEffect(()=>{
        banner()
    },[banner])
    return (
        <>
            <Center py={6}>
                <Box
                    maxW={800}
                    maxH={800}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    p={6}
                    overflow={'hidden'}>
                    <Box
                        h={'210px'}
                        bg={'gray.100'}
                        mt={-6}
                        mx={-6}
                        mb={6}
                        pos={'relative'}>
                        <video
                            autoPlay 
                            muted
                            loop
                            src={video.video}
                            layout={'fill'}
                        />
                    </Box>
                    <Change 
                     id={video?._id} 
                    />
                </Box>
            </Center>
        </>
    );
}