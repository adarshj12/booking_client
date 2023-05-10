import Navbar from '../../../components/user/NavBar/NavBar'
import Hotels from '../../../components/user/Hotel/Hotel';
import Footer from '../../../components/user/Footer/Footer'
import { Box } from '@chakra-ui/react';
const Hotel = () => {

    return (
        <>
            <Navbar />
            <Hotels/>
            <Footer/>
        </>
    )
}
export default Hotel;
