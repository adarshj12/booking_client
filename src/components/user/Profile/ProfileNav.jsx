import {
  Box,
  Button,
  ButtonGroup,
  HStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { startTransition } from 'react';
const Navbar = () => {
  const navigate = useNavigate()
  const NAV_ITEMS = [
    {
      element: 'Bookings',
      path: '/profile/bookings'
    },
  ]
  return (
    <Box as="section">
      <Box as="nav" bg="bg-surface" boxShadow="sm">
        <HStack ml={20} mt={6}>
          <ButtonGroup variant="link" spacing="8">
            {NAV_ITEMS.map((item, i) => (
              <Button
                onClick={() =>
                  startTransition(() => {
                    navigate(item.path);
                  })
                }
                size={20}
                key={i}
              >
                {item.element}
              </Button>
            ))}
          </ButtonGroup>
        </HStack>
      </Box>
    </Box>

  )
}

export default Navbar;