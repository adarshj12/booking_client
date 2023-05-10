import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { format } from 'timeago.js'

const Message = ({ message, own }) => {
  return (
    <Flex flexDirection="column" mt="20px" p={10} >
      <Flex>
        <Box
          p="10px"
          borderRadius={own?"20px 20px 0px 20px":"0px 20px 20px 20px" }
          bg={own ? "#F5F1F1" : "#1877f2"}
          color={own ? "black" : "white"}
          maxWidth="300px"
          ml={own ? "auto" : "0"}
        >
          <Text>{message.text}</Text>
        </Box>
      </Flex>
      <Text fontSize="12px" mt="10px" textAlign={own ? "right" : "left"}>
      {format(message.createdAt)}
      </Text>
    </Flex>

  )
}

export default Message
