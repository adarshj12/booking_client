import {
    Box,
    Flex,
    Heading,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    Grid,
    HStack,
    Text,
    SimpleGrid,
    Center
} from '@chakra-ui/react';
import { useState } from 'react';
import { addHotel } from '../../../utils/API'
import axios from '../../../utils/axios'
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import toast, { Toaster } from "react-hot-toast";
const AddNewProperty = () => {
    const [image, setImage] = useState([])
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [distance, setDistance] = useState('')
    const [desc, setDesc] = useState('')
    const [cheapestPrice, setCheapestPrice] = useState('')
    const [landmark,setLandmark] = useState('')
    const [lat,setLat] = useState(0)
    const [long,setLong] = useState(0)


    const [nameError, setNameError] = useState(false);
    const [typeError, settypeError] = useState(false)
    const [cityError, setCityError] = useState(false)
    const [addressError, setAddressError] = useState(false)
    const [distanceError, setDistanceError] = useState(false)
    const [descError, setDescError] = useState(false)
    const [cheapestError, setCheapestError] = useState(false)
    const [landmarkErr,setLandmarkErr] = useState(false)
    const [latErr,setLatErr] = useState(false)
    const [longErr,setLongErr] = useState(false)
    const [imageErr,setImageErr] = useState(false)


    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleNameChange = (value) => {
        if (!value.match(/^[a-zA-Z ]{3,30}$/)) {
            setNameError(true)
        } else {
            setNameError(false)
            setName(value);
        }
    }

    const handleTypeeChange = (value) => {
        if (!value.match(/^[a-zA-Z ]{3,10}$/)) {
            settypeError(true)
        } else {
            settypeError(false)
            setType(value);
        }
    }

    const handleCityChange = (value) => {
        if (!value.match(/^[a-zA-Z ]{3,25}$/)) {
            setCityError(true)
        } else {
            setCityError(false)
            setCity(value);
        }
    }

    const handleLandmarkChange = (value) => {
        if (!value.match(/^[a-zA-Z ]{5,30}$/)) {
            setLandmarkErr(true)
        } else {
            setLandmarkErr(false)
            setLandmark(value);
        }
    }

    const handleLattitudeChange = (value) => {
        if (!value.match(/\.\d+/g)) {
            setLatErr(true)
        } else {
            setLatErr(false)
            setLat(value);
        }
    }

    const handleLongitudeChange = (value) => {
        if (!value.match(/\.\d+/g)) {
            setLongErr(true)
        } else {
            setLongErr(false)
            setLong(value);
        }
    }

    const handleAddressChange = (value) => {
        if (!value.match(/^.{10,150}$/)) {
            setAddressError(true)
        } else {
            setAddressError(false)
            setAddress(value);
        }
    }

    const handleDistanceChange = (value) => {
        if (!value.match(/^\d{3}$/)) {
            setDistanceError(true)
        } else {
            setDistanceError(false)
            setDistance(value);
        }
    }


    const handleDescChange = (value) => {
        if (!value.match(/^.{10,1500}$/)) {
            setDescError(true)
        } else {
            setDescError(false)
            setDesc(value);
        }
    }

    const handleCheapChange = (value) => {
        if (!value.match(/^\d{3,4}$/)) {
            setCheapestError(true)
        } else {
            setCheapestError(false)
            setCheapestPrice(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        if (nameError || typeError || cityError || addressError || distanceError ||landmarkErr ||latErr||longErr|| descError || cheapestError ||imageErr||
            name === "" || type === '' ||landmark===''|| city === '' ||lat===''||long===''|| address === '' || distance === ''  || desc === '' || cheapestPrice === '') {
            toast.error('form not complete')
        } else {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("type", type);
            formData.append("city", city);
            formData.append("landmark", landmark);
            formData.append("lattitude", lat);
            formData.append("longitude", long);
            formData.append("address", address)
            formData.append("distance", distance)
            formData.append("desc", desc)
            formData.append("cheapestPrice", cheapestPrice)
            for (let i = 0; i < image?.length; i++) {
                formData.append('image', image[i]);
            }
            console.log(formData);
            const token = localStorage.getItem('clientToken');
            const decode = jwtDecode(token);
            console.log(decode);
            setLoading(true);
            await axios.post(`${addHotel}/${decode.id}`, formData, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
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
                                    Add Property
                                </Heading>
                                <form onSubmit={handleSubmit} >
                                    <SimpleGrid columns={2} spacingX='40px' spacingY='20px'>
                                        <VStack >

                                            <HStack>
                                                <Text fontWeight={500}>Name</Text>
                                                <Input placeholder="Enter name of Property" onChange={(e) => handleNameChange(e.target.value)} />

                                            </HStack>
                                            {nameError && <Text color={'red'} fontWeight={100}>Enter a valid property Name</Text>}
                                        </VStack>
                                        <VStack>

                                            <HStack>
                                                <Text fontWeight={500}>Type Of property</Text>
                                                <Input placeholder="Enter type of property" onChange={(e) => handleTypeeChange(e.target.value)} />
                                            </HStack>
                                            {typeError && <Text color={'red'} fontWeight={100}>Enter a valid property Type</Text>}
                                        </VStack>
                                        <VStack>

                                            <HStack>
                                                <Text fontWeight={500}>Nearest Landmark</Text>
                                                <Input placeholder="Enter Landmark" onChange={(e) => handleLandmarkChange(e.target.value)} />
                                            </HStack>
                                            {landmarkErr && <Text color={'red'} fontWeight={100}>Enter a Landmark</Text>}
                                        </VStack>
                                        <VStack>

                                            <HStack>
                                                <Text fontWeight={500}>Enter Lattitude</Text>
                                                <Input placeholder="Enter Lattitude" onChange={(e) => handleLattitudeChange(e.target.value)} />
                                            </HStack>
                                            {latErr && <Text color={'red'} fontWeight={100}>Enter Lattitude</Text>}
                                        </VStack>
                                        <VStack>

                                            <HStack>
                                                <Text fontWeight={500}>Enter Longitude</Text>
                                                <Input placeholder="Enter Longitude" onChange={(e) => handleLongitudeChange(e.target.value)} />
                                            </HStack>
                                            {longErr && <Text color={'red'} fontWeight={100}>Enter Longitude</Text>}
                                        </VStack>
                                        <VStack>

                                            <HStack>
                                                <Text fontWeight={500}>City</Text>
                                                <Input placeholder="Enter city" onChange={(e) => handleCityChange(e.target.value)} />
                                            </HStack>
                                            {cityError && <Text color={'red'} fontWeight={100}>Enter a valid City</Text>}
                                        </VStack>
                                        <VStack>

                                            <HStack>
                                                <Text fontWeight={500}>Address</Text>
                                                <Input placeholder="Enter address" onChange={(e) => handleAddressChange(e.target.value)} />
                                            </HStack>
                                            {addressError && <Text color={'red'} fontWeight={100}>Address should not be less than 10 characters and should not contain any symbols</Text>}
                                        </VStack>
                                        
                                        <VStack>

                                            <HStack>
                                                <Text fontWeight={500}> Description</Text>
                                                <Input placeholder="Enter description" onChange={(e) => handleDescChange(e.target.value)} />
                                            </HStack>
                                            {descError && <Text color={'red'} fontWeight={100}>Enter the property description</Text>}
                                        </VStack>
                                        <VStack>

                                            <HStack>
                                                <Text fontWeight={500}> Distance From Landmark</Text>
                                                <Input placeholder="Enter distance from center" onChange={(e) => handleDistanceChange(e.target.value)} />
                                            </HStack>
                                            {distanceError && <Text color={'red'} fontWeight={100}>Enter the distance From Landmark </Text>}
                                        </VStack>
                                        <VStack>

                                            <HStack>
                                                <Text fontWeight={500}>Prices Starting From</Text>
                                                <Input type='number' placeholder="Enter cheapest price" onChange={(e) => handleCheapChange(e.target.value)} />
                                            </HStack>
                                            {cheapestError && <Text color={'red'} fontWeight={100}>Mention the cheapest price in the property</Text>}
                                        </VStack>
                                    </SimpleGrid>

                                    <Box bg="white" p={8} rounded="lg" >
                                        <Center>
                                            <Heading size="md" mb={8}>
                                                Add Images
                                            </Heading>
                                        </Center>
                                        <VStack>
                                            <input multiple type="file"
                                                onChange={(e) => {
                                                    setImage(e.target.files);
                                                }}
                                            />
                                        </VStack>

                                    </Box>
                                    <Center>
                                        <Button type='submit'>ADD PROPERTY</Button>

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

export default AddNewProperty;