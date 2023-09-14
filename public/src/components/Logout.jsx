import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {MdLogout} from 'react-icons/md'
import {BsPerson} from 'react-icons/bs'

export default function Logout() {
    const navigate = useNavigate();
    const handleClickLogin = async () => {
        localStorage.clear();
        navigate('/login');
    }
    const handleClickAvatar = async () => {
        navigate('/setAvatar');
    }

  return (
    <Button>
        <MdLogout onClick={handleClickLogin} />
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