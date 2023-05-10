import React, { useEffect, useState } from 'react'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { GET_CLIENT_DETAIL, GET_DETAIL_USER } from '../../utils/API'
import axios from '../../utils/axios'


const Conversations = ({conversation,currentUser,isClient}) => {
  console.log(conversation,currentUser,isClient)
  const [user,setuser] = useState(null)
  useEffect(()=>{
    const friendId=conversation.members.find(m=>m!==currentUser._id)
    const getUser = async () => {
      try {
        if (isClient) {
          const token =localStorage.getItem('userToken')
          console.log(friendId);
          await axios.get(`${GET_DETAIL_USER}/${friendId}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
            console.log(res.data);
            setuser(res.data);
          });
        } else {
          const token =localStorage.getItem('clientToken')
          const usrId=conversation.members.find(m=>m!==friendId)
          await axios.get(`${GET_CLIENT_DETAIL}/${usrId}`, { headers: { 'Authorization': `Bearer ${token}` } }).then((res) => {
            console.log(res.data);
            setuser(res.data);
          });
        }
      } catch (err) {
        console.log("err");
        console.log(err.messages);
      }
    };
    getUser();
},[conversation,currentUser])
  return (
    <Flex alignItems="center" p="10px" cursor="pointer" mt="20px" _hover={{ bg: "#F5F3F3" }}>
      <Avatar
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPEBAQEBAQEA8PEQ8OEA4PDQ8NDw8QFREWFhURFxYYHSggGBolGxUVITEhJSkrLi4uGB8zOD8sNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwIBB//EADcQAAIBAgIHBQcDBAMAAAAAAAABAgMRBCEFEjFBUWFxIjKhscETUmKBkdHhQnLwM4KS8QZDU//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9kAAAAAAAAAAAA5VcRCHekly2v6AdQV1TSi/TFvm3Yjz0jUexqPRL1AuQUEsTN7Zy+tjw6kvef1YGiBndd8X9We44ia2Tl/kwL8FLDSFRb0+qXoSKelPej84u/gwLIHCjioT2SV+DyZ3AAAAAAAAAAAAAAAAAAAAAfG7AfThiMVGntefurb+CHi9I7of5fYrmwJdfHzls7K4Lb9SIAAB1oYedR2hFvjuS+ZYUtCSfeklyS1gKoGjpaMhHbqy604fY7PA0v/OH+CQGWBoqmiaT3OP7ZP1Is9CW2SuuGSf13gU4LGtoiolePa5d2X28Svkmsnk1tTyA+EmhjZw36y4PP/RGAF3hsbCeXdl7r9HvJJmydhNIOOU848drX3AtgeYSTSad09jR6AAAAAAAAAAAAAfG7fID5OSSu3ZLaynxmMdTJZQ4cebGOxftHZdxbOfMigAAAO2Epa8rWlL4Y2TfV7kc6cHJqK2tpI0+DwqpRstv6nxYH3DU5RVnqxS2Qgsl83t8DuAAAAAAACFpDAKqrrKa2S48mTQBkJwcW01Zp2a5nk0WkNHKpeSynbLg2uPkZ2wAAAd8JiXTeWcXtj/N5dUqimtZO6f8sZ474TEum77U9q4/kC9B5hNSSazT2HoAAAAAAAAAVmk8T/1r+77EzGV/Zxb37I9SibAAAAAAJ2hYXrL4VJ+FvU0ZntBytV6xkvJmhAAAAAAAAAAAAZrS1PVqytvtL67fG5pTP6d/qr9kfOQFcAAAAAmaOxOo9V92Xgy4M2XOjsRrxs+9HJ81uYEsAAAAAAOWJq6kJS4LLruAq9JVtadt0cl13siAAAAAAAEjR09WrTfxW+uXqakyuB/q0/3x8zVAAAAAAAAAAAAM5pmV60uSivC/qaMzemP60v7fJAQgAAAAA7YOtqTT3bH0ZxAGkBG0fV1oLjHsv5bPCxJAAAAV+l6mUY8XrP5fzwLAptJzvUa91JevqBEAAAAAAAB2w6cZ05NNLWjZtNJ5mrI+HcalOOScXFZbtmwkAAAAAAAAAAAAM1pNOVao0m0mk2le1oo0pzqyUIylkkk5PmBkgEAAAAAACfoipaUo8Vf5r/ZalDgp2qQfNL65epfAAAAKDFyvOb+J+GRfmdqPtS6vzA8gAAAAAAAutAV7qVN7u0uj2+PmW5mNGVtSrFt2TvF9GvvY0ntFfVuta17b7cQPYAAAAAAAAAAFXp6vaKgv1Zv9q/JZOava+bzS3mc0tWU6rs7qKUV8tvi2BDAAAAAAAB9i7NPg0zRmbZoqb7K6LyA9AAAjO1Nr6vzNEUGKVpzXxPzA5AAAAAAAAHfBV/Z1Iy3J2f7XtOAA2IIGh8Tr09V96GT5rcyeAAAAAAACNpDE+zpt73lHqwKTS1fXqu2yHYXXf4kIAAAAAAAAAAzQ0+7HovIzyV8vkaOwH0AACl0lG1R80n4W9C6K3S8O7LrF+a9QK0AAAAAAAAAAd8FiXSmpLZskuKNRTmpJSTunmmZAuf8Aj829eN+yrNLg3cC4AAAAAfG7Gb0ni/azy7sco8+LLPTs2qas7KUrPmrPIoAAAAAAAAAAAA64SN6kF8Sf0z9C/KnRMLzcvdXi/wCMtgAAAHHF0teElvtddUdgBmwScfR1JvhLtL1RGAAAAAAAAAF7oCnaEpe9LLovzcqMNh5VJasV1e5LizT0KShFRWyKt+QOgAAAACDpmnrUpfC1L6bfBszhsJxTTTzTTTXIzGOwcqUrW7L7suK4dQIwAAAAAAAAB1w1LXko8dvTeBaaNpasL75dr5biWfLH0AAAAAAjY+hrxy70c16opDSFTpLDar113ZbeTAggAAAT8Houc7OXYjzXafRAQYQcnZJtvcldlrhNDN51HZe6nn83uLTDYWFNWircXtb6s7geKNKMFaKSXBHsAAAAAAAHmcFJWaTT2p5o9ACnxmhltpu3wyeXyZU1aUoO0k0+DNcc69CM1aSTXl9gMkCzxmiJRzh2lw/UvuVjQAAAC20Zh9WOs9stnKJCwGG9pLPurbz5F2AAAAAAAAAPM4pppq6eTPQAosXhnTdv0vY/TqdMLo6pUztqx96WX0W8uLck7Z5q+ZLpzv1Ai4TRtOnnbWl70vRbiaAAAAAAAAAAAAAAAAAAIuKwMKneVpe8sn+SUAM5itF1IZrtx4pZ/QjUKDnLVXzfBGqnJIiSzbdkm+CA50aSglFbF48zoAAAAAAAAAAAAAJ2AAkU618nkzqQj3Cq1zQEoHiFRM9gAAAAAAAAAAAAPMppbQPRzqVUubOU6zezLzOYH2Ur7T4AAAAAAAAAAAAAAAAAAAAA9xqtfk8ADuq63o9qouPoRQBMufSEL/y4E0XIV/5cAS3UXFHh11uIx9A9yrN8uh4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q=="
        size="md"
        mr="20px"
      />
      <Text fontWeight="500" display={{ base: "none", md: "block" }}>
      {user?.username}
      </Text>
    </Flex>

  )
}

export default Conversations
