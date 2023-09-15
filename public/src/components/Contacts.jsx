// Import necessary packages
import {React, useState, useEffect} from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import Logout from './Logout'
import SetAvatarAgain from './SetAvatarAgain'

export default function Contacts({contacts, changeChat}) {

    // State to store current user details
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined)

    // Get current user details from local storage
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('chat-app-user'))
        if(currentUser){
            setCurrentUserName(currentUser.username)
            setCurrentUserImage(currentUser.avatarImage)
        }
    }, [])

    // Destructure the contacts
    const { users } = contacts;

    // Function to change current chat
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index)
        changeChat(contact)
    }

  return (
    <>
        {currentUserImage && currentUserName && (
                
            <Container>
                <div className="contact-header">
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                    </div>
                    
                    <div className="buttons">
                        <SetAvatarAgain />
                        <Logout />
                    </div>
                </div>

                <div className="contacts">
                    {
                        users?.map((users, index) => {
                            return (
                                <div className={`contact ${currentSelected === index ? "selected" : ""}`} key={index} onClick={() => changeCurrentChat(index, users)}>
                                    <div className="avatar">
                                        <img src={`${users.avatarImage}`} alt="avatar"/>
                                    </div>
                                    <div className="username">
                                        <h3>{users.username}</h3>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                
                <div className="current-user">
                    <div className="avatar">
                        <img src={`${currentUserImage}`} alt="avatar"/>
                    </div>
                    <div className="username">
                        <h2>{currentUserName}</h2>
                    </div>
                </div>

            </Container>
        )}
    </>
  )
}

// Styled components
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #001D3D;
  /* background-color: #219EBC; */
  /* outline: #9186f3 solid 0.05rem; */
  /* box-shadow: 0 -0.2px 8px #9a86f3; */
    .contact-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        background-color: #002a57;
        box-shadow: 0 -1px 10px black;
        .brand {
              display: flex;
              align-items: center;
              gap: 1rem;
              justify-content: center;
              img {
                  height: 2rem;
              }
        }
        .buttons{
            display: flex;
            gap: 1rem;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        margin-top: 2rem;
        &::-webkit-scrollbar {
            width: 0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
    }
    .contact {
        background-color: #6e6c6ca6;
        /* background-color: #003566; */
        min-height: 5rem;
        cursor: pointer;
        width: 90%;
        border-radius: 0.2rem;
        padding: 0.4rem;
        display: flex;
        gap: 1rem;
        align-items: center;
        transition: 0.5s ease-in-out;
        box-shadow: 0 -1px 4px black;
        .avatar {
            img {
                height: 3rem;
            }
        }
        .username {
            h3 {
                color: white;
            }
        }
    }
    .selected {
      /* background-color: #9a86f3; */
      background-color: #FFC300;
      .username {
            h3 {
                color: black;
            }
        }
    }
  }

    .current-user {
        /* background-color: #0d0d30; */
        background-color: #002a57;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        box-shadow: 0 -1px 10px black;
        .avatar {
        img {
            height: 4rem;
            max-inline-size: 100%;
            border-radius: 50%;
            box-shadow: 0 2px 5px black;
        }
    }
    .username {
        h2 {
            color: white;
        }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        gap: 0.5rem;
        .username {
            h2 {
            font-size: 1rem;
            }
        }
    }
    @media screen and (min-width: 360px) and (max-width: 480px){
        gap: 0.5rem;
        .username {
          h2 {
            font-size: 1rem;
          }
        }
    }
  }
`;
