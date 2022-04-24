import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import loader from '../assets/loader.gif'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import {setAvatarRoute} from '../utils/APIRoutes.js'
import {Buffer} from 'buffer'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    height: 100vh;
    width: 100vw;
    background-color: #441257;
    .loader {
        max-inline-size: 100%;
    }
    .title-container {
        h1 {
            color: #fff;
            margin-bottom: 3rem;
            text-align: center;
        }
    }

    button {
      background-color: #3ef788;
      color: white;
      padding: 0.7rem 1.5rem;
      cursor: pointer;
      border: none;
      font-weight: bold;
      border-radius: 0.4rem;
      font-size: 1.1rem;
      text-transform: uppercase;
      transition: .3s ease-in-out;
      &:hover {
        background-color: #1ee86f;
      }
    }
    
    .loader {
        background-color: transparent;
        img {
            height: 128px;
            width: 128px;
        }
    }

    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            border: .4rem solid transparent;
            padding: .4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: .5s ease-in-out;
        }
        img {
            height: 6rem;
        }
        .selected {
        border: .3rem solid #3ef788;
    }
    }
`

const SetAvatar = () => {
    const api = "https://api.multiavatar.com/45678945"
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    }

    const setProfilePicture = async () => {
        if(selectedAvatar === undefined) {
            toast.error("Please select avatar.", toastOptions)
            return false
        } else {
            const user = await JSON.parse(localStorage.getItem('user1'))
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar]
            })

            if(data.isSet) {
                user.isAvatarImageSet = true
                user.avatarImage = data.image
                localStorage.setItem('user1', JSON.stringify(user))
                navigate('/')
            } else {
                toast.error('Something went wrong. Please try again', toastOptions)
            }
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = []
            for (let i = 0; i < 5; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`)
                const buffer = new Buffer(image.data)
                data.push(buffer.toString("base64")) 
            }
            setAvatars(data)
            setIsLoading(false)
        }
        const isConnected = async () => {
            if(!localStorage.getItem('user1')) {
                navigate('/login')
            }
        }
        isConnected()
        fetchData()
    }, [])

  return (
      <>
        {isLoading ? 
            <Container>
                <img src={loader} alt="loader" className='loader' />
            </Container> : (
                <Container>
                <div className="title-container">
                    <h1>
                        Choose your avatar:
                    </h1>
                    <div className="avatars">
                        {
                            avatars.map((avatar, index) => {
                                return (
                                    <div key={index} className={`avatar 
                                    ${selectedAvatar === index ? "selected" : ""}
                                    `}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <button className='submit-btn' onClick={() => setProfilePicture()}>Set a profile picture</button>
                </Container>
            )
        }
        <ToastContainer />
      </>
  )
}

export default SetAvatar