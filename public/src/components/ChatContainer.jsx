import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Logout from './Logout'
import SetAvatarAgain from './SetAvatarAgain'
import ChatInput from './ChatInput'
import axios from 'axios'
import { sendMessagesRoute } from '../utils/APIRoutes'
import { getMessagesRoute } from '../utils/APIRoutes'
import {v4 as uuidv4} from 'uuid'

export default function ChatContainer({currentChat, currentUser, socket}) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        const getMessages = async () => {
            if(currentChat){
                const data = await axios.post(getMessagesRoute, {sender: currentUser._id, receiver: currentChat._id});
                setMessages(data.data);
            }
        }
        getMessages();
    }, [currentChat])


    const handleSendMessage = async (message) => {
        await axios.post(sendMessagesRoute, {sender: currentUser._id, receiver: currentChat._id, message});
        socket.current.emit('send-msg', {sender: currentUser._id, receiver: currentChat._id, message});
        const msgs = [...messages];
        msgs.push({senderSelf: true, message});
        setMessages(msgs);
    }

    useEffect(() => {
        if(socket.current){
            socket.current.on('msg-receive', (data) => {
                setArrivalMessage({senderSelf: false, message: data.message})
            });
        }
    }, [arrivalMessage])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages])

  return (
    <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <img src={currentChat?.avatarImage} alt="avatar" />
                </div>
                <div className="username">
                    <h3>{currentChat?.username}</h3>
                </div>
            </div>
        </div>
        <div className="chat-messages">
            {
                messages ?.map((msg) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div className={`message ${msg.senderSelf ? "sended" :"received" }`}>
                                <div className="content">
                                    <p> {msg.message} </p>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
        <ChatInput handleSendMessage={handleSendMessage}/>

    </Container>
  )
}

const Container = styled.div`
    padding-top: 1rem;
    display: grid;
    grid-template-rows: 8% 80% 12%;
    gap: 0.1rem;
    overflow: hidden;

    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        margin-top: -15px;
        box-shadow: 0 2px 8px #3476f4;
        .user-details{
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar{
                img{
                    height: 3rem;
                }
            }
            .username{
                h3{
                    color: white;
                }
            }

        }
        .buttons{
            display: flex;
            gap: 1rem;
        }
    }
    .chat-messages{
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        &::-webkit-scrollbar{
        width: 0.4rem;
            &-thumb{
                background-color: #ffffff39;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .message{
            display: flex;
            align-items: center;
            .content{
                max-width: 40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color: #d1d1d1;
            }
        }
        .sended{
            justify-content: flex-end;
            .content{
                background-color: #3476f4;
            }
        }
        .received{
            justify-content: flex-start;
            .content{
                background-color: #ffffff39;
            }
        }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px){
        grid-template-rows: 15% 70% 15%;
    }
    @media screen and (min-width: 360px) and (max-width: 480px){
        grid-template-rows: 18% 64% 18%;
    }

`