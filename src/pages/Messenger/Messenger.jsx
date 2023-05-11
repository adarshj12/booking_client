import React, { useRef, useState, useEffect } from 'react'
import Conversations from '../../components/Chat/Conversation'
import Message from '../../components/Chat/Message'
import { Box, Input, InputGroup, Container, Text, Textarea, Button, Center } from '@chakra-ui/react'
import { io } from 'socket.io-client'
import axios from '../../utils/axios'
import { FaTelegramPlane } from 'react-icons/fa'
import background from '../../assets/chat.jpg'
import { GET_CONVERSATIONS, GET_MESSAGES, NEW_MESSAGE } from '../../utils/API'
import jwtDecode from 'jwt-decode'
import { useSelector } from 'react-redux'
const Messenger = ({ user }) => {
    let commonUser;
    const clientToken = useSelector((state) => state.client.token);
    if (clientToken) {
        commonUser = jwtDecode(clientToken);
    }

    const userToken = useSelector((state) => state.user.token);
    if (userToken) {
        commonUser = jwtDecode(userToken);
    }
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessaage, setArrivalMessage] = useState(null)

    const scrollRef = useRef()
    const socket = useRef()

    useEffect(() => {
        socket.current = io("wss://api.booknstay.site")
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessaage && currentChat?.members.includes(arrivalMessaage.sender) &&
            setMessages(prev => [...prev, arrivalMessaage])
    }, [arrivalMessaage, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", commonUser.id)
        socket.current.on("getUsers", users => {
            console.log(users)
        })
    }, [commonUser])

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(`${GET_CONVERSATIONS}/${commonUser.id}`)
                setConversations(res.data);

            } catch (error) {
                console.log(error.message);
            }
        }
        getConversations()
    }, [commonUser.id])
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`${GET_MESSAGES}/${currentChat?._id}`)
                setMessages(res.data)
            } catch (error) {
                console.log(error.message);
            }
        }
        getMessages()
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: commonUser.id,
            text: newMessage,
            conversationId: currentChat._id
        }
        const receiverId = currentChat.members.find(member => member !== commonUser.id)
        socket.current.emit("sendMessage", {
            senderId: commonUser.id,
            receiverId,
            text: newMessage
        })
        try {
            const res = await axios.post(`${NEW_MESSAGE}`, message)
            setMessages([...messages, res.data])
            setNewMessage('')
        } catch (error) {
            console.log(error.message);
        }
    }



    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [messages])
    return (

        <Box height="500px" display="flex" mr={5}>
            <Box flex="2">
                {conversations.map((c) => {
                    return (
                        <Box onClick={() => setCurrentChat(c)}>
                            {clientToken ? (
                                <Conversations
                                    key={c._id}
                                    conversation={c}
                                    currentUser={commonUser.id}
                                    isClient={true}
                                />
                            ) : (
                                <Conversations
                                    key={c._id}
                                    conversation={c}
                                    currentUser={commonUser.id}
                                    isClient={false}
                                />
                            )}
                        </Box>
                    );
                })}
            </Box>

            <Box flex="5.5" position="relative" backgroundImage={background}>
                <Box height="calc(100% - 95px)" overflowY="scroll" paddingRight="10px" css={{ '::-webkit-scrollbar': { display: 'none' } }}>
                    {currentChat ? (
                        <>
                            {messages.map((m) => (
                                <Box ref={scrollRef} key={m._id}>
                                    <Message message={m} own={m.sender === commonUser.id} />
                                </Box>
                            ))}
                        </>
                    ) : (
                        <Box position="absolute" top="10%" fontSize="50px" color="rgb(224, 220, 220)" cursor="default">
                            Open A Conversation to start a Chat
                        </Box>
                    )}
                </Box>

                <Center>
                    {currentChat && (
                        <Box position="absolute" bottom="0" left="0" right="0" padding="10px">
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                marginTop={5}
                            >
                                <Input
                                    placeholder="Write something..."
                                    width={400}
                                    height={12}
                                    value={newMessage}
                                    backgroundColor={'white'}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => {
                                        e.key === 'Enter' &&
                                            handleSubmit()
                                    }}
                                ></Input>
                                <Box marginLeft="10px">
                                    <FaTelegramPlane
                                        fontSize={30}
                                        onClick={handleSubmit}
                                        cursor="pointer"
                                        color={newMessage ? "#128C7E" : "gray.300"}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    )}
                </Center>
            </Box>
        </Box>

    )
}

export default Messenger
