import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';
import { Link as RouterLink ,useNavigate} from 'react-router-dom';
import { status } from '../../../utils/API'
import axios from '../../../utils/axios'
import jwtDecode from "jwt-decode";
import Swal from 'sweetalert2';


export default function WithSubnavigation() {
    // const navigate =useNavigate()
    // const verificationStatus = async () => {
    //     const token = localStorage.getItem('clientToken');
    //     const decode = jwtDecode(token);
    //     // console.log(decode);
    //     await axios.get(`${status}/${decode.id}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
    //         // console.log(res);
    //         if (res.data.message) navigate('/client/property')
    //         else {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'You are not verified'
    //             })
    //         }
    //     }).catch((err) => {
    //         console.log(`error=> ${err.message}`)
    //     })
    // }


    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
            >
                <Flex flex={1} justify={'center'}>
                    <DesktopNav />
                </Flex>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>
        </Box>
    );
}

const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} spacing={4} align={'center'}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    {navItem.children ? (
                        <Popover trigger={'hover'} placement={'bottom-start'}>
                            <PopoverTrigger>
                                <Link
                                    p={2}
                                    as={RouterLink}
                                    to={navItem.href ?? '#'}
                                    fontSize={'sm'}
                                    fontWeight={500}
                                    color={linkColor}
                                    _hover={{
                                        textDecoration: 'none',
                                        color: linkHoverColor,
                                    }}
                                >
                                    {navItem.label}
                                </Link>
                            </PopoverTrigger>

                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <Link
                            p={2}
                            as={RouterLink}
                            to={navItem.href ?? '#'}
                            fontSize={'sm'}
                            fontWeight={500}
                            color={linkColor}
                            _hover={{
                                textDecoration: 'none',
                                color: linkHoverColor,
                            }}
                        >
                            {navItem.label}
                        </Link>
                    )}
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
        <Link
            as={RouterLink}
            to={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}
        >
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text transition={'all .3s ease'} _groupHover={{ color: 'green.400' }} fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'green.600'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Link>
    );
};
const MobileNav = () => {
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    );
};

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{
                    textDecoration: 'none',
                }}
            >
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}
                >
                    {children &&
                        children.map((child) => (
                            <Link key={child.label} py={2} as={RouterLink} to={child.href}>
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};

const NAV_ITEMS = [
    {
        label: 'Properties',
        href: '/client/property',
    },
    {
        label: 'Analytics',
        children: [
            {
                label: 'Bookings',
                subLabel: 'View All Bookings',
                href: '/client/bookings',
            },
            {
                label: 'Finance',
                subLabel: 'View the payment status',
                href: '/client/fianace',
            },
        ],
    },
    {
        label: 'Cancelations',
        href: '/client/cancel',
    },
    {
        label: 'Chat Requests',
        href: '/client/chat',
    },
];
