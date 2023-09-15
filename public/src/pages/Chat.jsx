// Import necessary packages
import {React, useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { allUserRoutes } from '../utils/APIRoutes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import {io} from 'socket.io-client'
import { host } from '../utils/APIRoutes'

function Chat() {
  const navigate = useNavigate()

  // State to store contacts, current user and current chat
  const [contacts, setContacts] = useState([])
  const [currentUser, setCurrentUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined)

  // Socket connection
  const socket = useRef();

  // Check if user is already stored in local storage
  useEffect(() => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } 
      else {
        // Set current user
        const setUser = async () => {
          try {
            const user = await JSON.parse(localStorage.getItem('chat-app-user'))
            setCurrentUser(user);
          } catch (error) {
            console.error('Error while parsing and setting currentUser:', error);
          }
        };
        setUser();
      }
  }, []);
  
  // Connect to socket and add user to the socket
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser]);

  // Get all contacts of the current user
  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        // Get all contacts
        const getAllContacts = async () => {
          try {
            // Get all users except the current user
            const data = await axios.get(`${allUserRoutes}/${currentUser._id}`);
            setContacts(data.data);
          } catch (error) {
            console.error("Error fetching contacts:", error);
          }
        };
        getAllContacts();
      } else {
        navigate('/setAvatar');
      }
    }
  }, [currentUser]);
  
  // Function to handle chat change
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat = {handleChatChange} />
          
          {
            currentChat === undefined ? <Welcome currentUser = {currentUser}/> : 
              <ChatContainer currentChat = {currentChat} currentUser = {currentUser} socket={socket}/>
          }

        </div>
      </Container>
    </>
  )
}

// Styled components
const Container = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
height: 100vh;
width: 100vw;
gap: 1rem;
align-items: center;
background-color: #000030;
.container{

  box-shadow: 0 5px 15px black;
  height: 85vh;
  width: 85vw;
  /* background-color: #00000076; */
  background-color: #000814;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px){
    grid-template-columns: 35% 65%;
  }
  @media screen and (min-width: 360px) and (max-width: 480px){
    grid-template-columns: 45% 55%;
  }
}

`

export default Chat