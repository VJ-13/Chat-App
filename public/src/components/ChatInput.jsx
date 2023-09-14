import React, {useState} from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'


export default function ChatInput({handleSendMessage}) {

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [message, setMessage] = useState('');

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (e, emojiObject) => {
        setMessage(message + emojiObject.emoji);
    }

    const sendChat = (e) => {
        e.preventDefault();
        if(message.length > 0){
            handleSendMessage(message);
            setMessage('');
        }
    }

    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className='input-container' onSubmit={(e) => sendChat(e)}>
                <input type="text" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button type="submit"> <IoMdSend /> </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #000814;
    padding: 0 2rem;
    padding-bottom: 0.3rem;
    box-shadow: 0 -1px 8px #3476f4;
    .button-container{
        display: flex;
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji{
            position: relative;
            svg{
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .emoji-picker-react{
                position: absolute;
                top: -350px;
                width: 350px;
                background-color: #000814;
                box-shadow: 0 5px 10px black;
                border: none;
                .emoji-scroll-wrapper::-webkit-scrollbar{
                    background-color: #000814;
                    width: 5px;
                    &-thumb{
                        background-color: #3476f4;
                    }
                }
                .emoji-categories{
                    button{
                        filter: contrast(0);
                    }
                }
                .emoji-search{
                    background-color: transparent;
                    border-color: #3476f4;
                    color: white;
                }
                .emoji-group:before{
                    background-color: #000814;
                }

            }
        }
    }
    .input-container{
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        background-color: #ffffff34;
        input{
            width: 90%;
            height: 60%;
            background-color: transparent;
            border: none;
            color: white;
            padding-left: 1rem;
            font-size: 1.2rem;
            &::selection{
                background-color: #9a86f3;
            }
            &:focus{
                outline: none;   
            }
        }
        button{
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #3476f4;
            border: none;
            svg{
                font-size: 2rem;
                color: white;
            }
            @media screen and (min-width: 720px) and (max-width: 1080px){
                padding: 0.3rem 1rem;
                svg{
                    font-size: 1rem;
                }
            }
        }

    }

    @media screen and (min-width: 720px) and (max-width: 1080px){
        padding: 0 1rem;
        gap: 1rem;
    }

`
