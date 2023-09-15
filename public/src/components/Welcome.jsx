// Import necessary packages
import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'

export default function Welcome({currentUser}) {
  return (
    <Container>
        <img src={Robot} alt="Logo" />
        <h1>
            Welcome, <span>{currentUser?.username}</span> !
        </h1>
        <h3>
            Start a conversation by selecting a contact on the left
        </h3>

    </Container>
  )
}

// Styled components
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    gap: 1rem;
    img{
        height: 20rem;
    }
    span{
        color: #3476f4;
    }
`
