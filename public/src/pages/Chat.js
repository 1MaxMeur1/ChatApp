import React, {useState, useEffect} from 'react'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import styled from 'styled-components'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {allUsersRoute} from '../utils/APIRoutes'

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #140421;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #722cb8;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`

const Chat = () => {
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)
  const navigate = useNavigate()

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  const isLoggedIn = async () => {
    if(!localStorage.getItem('user1')) {
      navigate('/login')
    } else {
      setCurrentUser( await JSON.parse(localStorage.getItem('user1')))
    }
  }

  const isImagePresent = async () => {
    if(currentUser.isAvatarImage) {
      const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
      setContacts(data.data)
    } else {
      navigate('/setAvatar')
    }
  }

  useEffect(() => {
    if(currentUser) {
      isImagePresent()
    }
    isLoggedIn()
  }, [currentUser])

  return (
    <>
      <Container>
        <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        <Welcome currentUser={currentUser}/>
        </div>
      </Container>
    </>
  )
}

export default Chat