import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {BsPerson} from 'react-icons/bs'

export default function SetAvatarAgain() {
    const navigate = useNavigate();
    const handleClick = async () => {
        const currentUser = await JSON.parse(localStorage.getItem('chat-app-user'));
        currentUser.isAvatarImageSet = false;
        currentUser.avatarImage = undefined;
        localStorage.setItem('chat-app-user', JSON.stringify(currentUser));
        console.log(currentUser);
        navigate('/setAvatar');
    }
  return (
    <Button>
        <BsPerson onClick={handleClick} />
    </Button>
  )
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: #3476f4; */
    background: transparent;
    border: none;
    padding-left: 0%;
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 50%;
    svg{
        color: #3476f4;
        font-size: 2rem;
    }
`