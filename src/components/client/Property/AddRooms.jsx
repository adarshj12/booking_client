import {
    Box,
    Heading,
    VStack,
    Input,
    Button,
    HStack,
    Text,
    SimpleGrid,
    Center,
    Image,
    Stack
} from '@chakra-ui/react';
import { useState } from 'react';
import { ADD_ROOM } from '../../../utils/API'
import axios from '../../../utils/axios'
import jwtDecode from "jwt-decode";
import { useLocation, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import toast, { Toaster } from "react-hot-toast";
const AddNewRoom = () => {
    const location = useLocation();
    console.log(location.state);
    const hotelname = location.state.name
    const [image, setImage] = useState([])
    const [name, setName] = useState('')
    const [rate, setRate] = useState('')
    const [people, setPeople] = useState('')
    const [description, setDescription] = useState('')

    const [nameError, setNameError] = useState(false);
    const [rateError, setRateError] = useState(false)
    const [peopleError, setPeopleError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [imageErr, setImageErr] = useState(false)


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleNameChange = (value) => {
        if (!value.match(/^[a-zA-Z ]{3,15}$/)) {
            setNameError(true)
        } else {
            setNameError(false)
            setName(value);
        }
    }

    const handleRateChange = (value) => {
        if (!value.match(/^\d{3,4}$/)) {
            setRateError(true)
        } else {
            setRateError(false)
            setRate(value);
        }
    }

    const handlePeopleChange = (value) => {
        if (!value.match(/^\d{1}$/)) {
            setPeopleError(true)
        } else {
            setPeopleError(false)
            setPeople(value);
        }
    }

    const handleDescriptionChange = (value) => {
        if (!value.match(/^.{10,50}$/)) {
            setDescriptionError(true)
        } else {
            setDescriptionError(false)
            setDescription(value);
        }
    }



    const handleImage = (e) => {
        let temp = [];
        for (let i = 0; i < e.target.files?.length; i++) {
            let type = e.target.files[i]?.type.split('/')[0];
            console.log(type);
            if (type == 'image') {
                temp = ([...temp, e.target.files[i]])
            } else {
                setImageErr(true)
            }
        }
        setImage(() => {
            return [...temp]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (imageErr) toast.error('invalid image uploaded')

        if (nameError || rateError || peopleError || descriptionError || imageErr ||
            name === "" || rate === '' || people === '' || description === '') {
            toast.error('form not complete')
        } else {
            console.log('hello');
            console.log('hello2');
            const formData = new FormData();
            formData.append("title", name);
            formData.append("rate", rate);
            formData.append("people", people);
            formData.append("desc", description)
            for (let i = 0; i < image?.length; i++) {
                formData.append('image', image[i]);
            }
            console.log(formData);
            const token = localStorage.getItem('clientToken');
            const decode = jwtDecode(token);
            console.log(decode);
            setLoading(true);
            await axios.post(`${ADD_ROOM}/${location.state.id}`, formData, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    setLoading(false);
                    navigate('/client/property')
                }
            }).catch((err) => {
                console.log(`error=> ${err.message}`)
            })
        }
    };


    return (
        <>
            {loading ?
                <div className="loading-spinner">
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#234790"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    />
                </div>

                :

                (
                    <Box display="flex" flexDirection="row">
                        <Box flex={1}>
                            <Box bg="white" p={8} rounded="lg" shadow="md">
                                <Heading size="md" mb={8}>
                                    Add Room to {hotelname}
                                </Heading>
                                <form onSubmit={handleSubmit} >
                                    <SimpleGrid columns={2} spacingX='40px' spacingY='20px'>
                                        <VStack >

                                            <HStack>
                                                <Text fontWeight={500}>Title</Text>
                                                <Input placeholder="Enter name of Room" onChange={(e) => handleNameChange(e.target.value)} />

                                            </HStack>
                                            {nameError && <Text color={'red'} fontWeight={100}>Enter a valid Room Name</Text>}
                                        </VStack>
                                        <VStack>

                                            <HStack>
                                                <Text fontWeight={500}>Rate</Text>
                                                <Input type='number' placeholder="Enter rate of Room" onChange={(e) => handleRateChange(e.target.value)} />
                                            </HStack>
                                            {rateError && <Text color={'red'} fontWeight={100}>Enter a valid Price</Text>}
                                        </VStack>
                                        <VStack>

                                            <HStack>
                                                <Text fontWeight={500}>Maximum People</Text>
                                                <Input type='number' placeholder="Enter capacity of Room" onChange={(e) => handlePeopleChange(e.target.value)} />
                                            </HStack>
                                            {peopleError && <Text color={'red'} fontWeight={100}>Enter a valid capacity</Text>}
                                        </VStack>
                                        <VStack>

                                            <HStack>
                                                <Text fontWeight={500}>Description</Text>
                                                <Input placeholder="Enter Description" onChange={(e) => handleDescriptionChange(e.target.value)} />
                                            </HStack>
                                            {descriptionError && <Text color={'red'} fontWeight={100}>Enter a valid description</Text>}
                                        </VStack>

                                    </SimpleGrid>
                                    <Stack ml={20} direction={['column', 'row']} spacing={6}>
                                        <HStack mt={10}>

                                            {image && image.map((elem, i) => {
                                                return (
                                                    <Box key={i}>
                                                        <Image size="md" src={URL.createObjectURL(elem)} h={350} width={200} />

                                                    </Box>
                                                )
                                            })
                                            }

                                        </HStack>
                                    </Stack>

                                    <Box bg="white" p={8} rounded="lg" >
                                        <Center>
                                            <Heading size="md" mb={8}>
                                                Add Images
                                            </Heading>
                                        </Center>
                                        <VStack>
                                            <input multiple type="file"
                                                onChange={(e) => {
                                                    handleImage(e);
                                                }}
                                            />
                                        </VStack>

                                    </Box>
                                    <Center>
                                        <Button type='submit'>ADD ROOM</Button>

                                    </Center>

                                </form>

                            </Box>
                        </Box>

                        <Toaster />
                    </Box>


                )

            }

        </>
    )
}

export default AddNewRoom;