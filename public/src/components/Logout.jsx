// Import necessary packages
import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {MdLogout} from 'react-icons/md'

export default function Logout() {
    const navigate = useNavigate();

    // Navigate to login page
    const handleClickLogin = async () => {
        localStorage.clear();
        navigate('/login');
    }

  return (
    <Button>
        <MdLogout onClick={handleClickLogin} />
    </Button>
  )
}

// Styled components
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