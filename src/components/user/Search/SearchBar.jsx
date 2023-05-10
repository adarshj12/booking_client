import React, { useState } from 'react';
import { Box, Input, InputGroup, VStack, Text } from '@chakra-ui/react';

const SearchBar = ({ data, setDestination, destination }) => {
    const [filter, setFilter] = useState([]);

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        const newFilter = data.filter((value) => {
            return value.city.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilter([]);
        } else {
            setFilter(newFilter);
        }
        setDestination(searchWord);
    };

    const selection = (place) => {
        setDestination(place);
        setFilter([]);
    };

    return (
        <>
            <InputGroup>
                <VStack sx={{ maxWidth: '250', position: 'relative' }}>
                    <Input
                        style={{ width: '250px' }}
                        rounded={'none'}
                        bg="white"
                        placeholder={destination?destination:'Where are you going ?'}
                        value={destination}
                        onChange={handleFilter}
                    />
                    {filter.length !== 0 &&
                        <div className="dataResult" style={{ width: '-webkit-fill-available', position: 'absolute', top: '100%', zIndex: '1' }}>
                            {filter.slice(0, 5).map((value, key) => (
                                <Box className='dataItem' _hover={{ cursor: 'pointer', bg: 'gray.100' }} key={key}>
                                    <Text onClick={() => selection(value.city)}>{value.city}</Text>
                                </Box>
                            ))}
                        </div>
                    }
                </VStack>
            </InputGroup>

        </>
    );
};

export default SearchBar;
