// Import necessary packages
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { loginRoute } from '../utils/APIRoutes'

function Login() {
    const navigate = useNavigate();

    // State to store user details
    const [user, setUser] = useState({
        username: '', password: ''
    });

    // Function to handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){
            const {password, username} = user;

            // Send user details to backend
            const {data} = await axios.post(loginRoute, {username, password});

            // Check if user is in the database
            if(data.status === false){
                toast.error(data.message, toastOption);
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user', JSON.stringify(data.user));
                navigate("/")
            }
        }

    }

    // Toast options
    const toastOption = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
    }

    // Check if user is already logged in by looking at local storage
    useEffect(() => {
        const user = localStorage.getItem('chat-app-user');
        if(user){
          navigate('/')
        }
    }, [])

    // Function to validate user details
    const handleValidation = (event) => {
      const {password, username} = user;
      if (username === "" || password === "") {
        toast.error('Username and Password is required', toastOption);
        return false;
      } 
      return true;
    }

    // Function to handle input change
    const handleChange = (event) => {
        // Update user state
        setUser({
            ...user, [event.target.name]: event.target.value
        })
    };

  return (
    <>
        <FormContainer>
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt="Logo" />
                </div>
                <input type="text" placeholder='Username' name='username' onChange={e => handleChange(e)} />
                <input type="password" placeholder='Password' name='password' onChange={e => handleChange(e)} />  
                <button type='submit'> Login </button>
                <span> Don't have an account ? <Link to="/register">Register</Link> </span>
            </form>
        </FormContainer>
        <ToastContainer />
    </>

  )
}

// Styled components
const FormContainer = styled.div`
    height: 100vh;
    width: 100wh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #000030;
    .brand{
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            height: 5rem;
        }
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #000814;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #003fb4;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus{
                border: 0.1rem solid #3476f4;
                outline: none;
            }
        }
        button{
            background-color: #3476f4;
            color:white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover{
                background-color: #003fb4;
            }
        }
        span{
            color: white;
            text-transform: uppercase;
            a{
                color: #3476f4;
                text-decoration: none;
                font-weight: bold;

            }
        }
    }

`;

export default Login