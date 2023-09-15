// Import necessary packages
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Loader from '../assets/loader.gif'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { setAvatarRoute } from '../utils/APIRoutes'
import {RxReload} from 'react-icons/rx'

export default function SetAvatar() {

    const api = "https://api.multiavatar.com";
    const navigate = useNavigate();

    // State to store user details
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatars, setSelectedAvatars] = useState(undefined);

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
        if(!localStorage.getItem('chat-app-user')){
            navigate('/login');
        }
    }, [navigate])

    // Function to set profile picture for the user
    const setProfilePicture = async () => {
        if(selectedAvatars === undefined){
            toast.error('Please select an avatar', toastOption);
        }
        else{
            const user = await JSON.parse(localStorage.getItem('chat-app-user'));
            if(user.isAvatarImageSet === false && user.avatarImage === undefined){
                setSelectedAvatars(undefined);  
                setAvatars([]);
            }
            // Send the selected avatar to the backend
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {image: avatars[selectedAvatars]});

            // Check if avatar is set successfully
            if(data.isSet){
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem('chat-app-user', JSON.stringify(user));
                navigate('/');
            }
            else{
                toast.error('Something went wrong with setting up the avatar. Please try again', toastOption);
            }
        };
    }

    // Function to get random avatars from the API
    const getData = async () => {
        const data = [];
        for(let i = 0; i < 4; i++){
            const image = await axios.get(`${api}/${Math.round(Math.random() * (Math.round(Math.random() * 10000)))}.png?apikey=${process.env.AVATAR_API}`);
            // Push the image url to the data array
            data.push(image.config.url);
        };
        setAvatars(data);
        setIsLoading(false);
    };

    // Get random avatars when the component mounts since the useEffect can not be an async function
    useEffect(() => {
        getData();
    }, []);

    // Function to refresh the page
    const refreshPage = () => {
        window.location.reload();
    }

  return (
    <>
        {
            isLoading ? <Container>
                <img className="loader" src={Loader} alt="loader"/>
            </Container> : (

            <Container>
                <div className="title-container">
                    <h1>Pick an Avatar as your profile picture</h1>
                </div>

                <div className="avatars">
                    {avatars.map((avatar, index) => {
                        return (
                            <div className={`avatar ${selectedAvatars === index ? "selected" : ""}`}>
                            <img src={`${avatar}`} alt="avatar" key={avatar} onClick={() => setSelectedAvatars(index)}/>
                        </div>
                        );
                    })}
                </div>

                <button className='submit-btn' onClick={() => setProfilePicture()}>Set Profile Picture</button>
                <RxReload className='refresh-btn' onClick={refreshPage}/>
            </Container>
            )
        }
        <ToastContainer />
    </>
  )
}

// Styled components
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #000030;
    height: 100vh;
    width: 100vw;
    .loader{
        max-inline-size: 100%;
    }
    .title-container{
        h1{
            color: white;
        }
    }
    .avatars{
        display: flex;
        gap: 2rem;
        .avatar{
            border: 0.4rem solid transparent;
            padding: 0.4rem;    
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height: 6rem;
                border-radius: 50%;
                box-shadow: 0 5px 5px black;
            }
        }
        .selected{
            border: 0.4rem solid #003fb4;
        }
    }
    .submit-btn{
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
    .refresh-btn{
        color: white;
        font-size: 2rem;
        cursor: pointer;
        transition: 0.5s ease-in-out;
        &:hover{
            color: #3476f4;
        }
    }

`;
