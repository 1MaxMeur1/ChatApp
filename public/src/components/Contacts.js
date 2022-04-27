import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo_chat.png'

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    padding: 0.4rem;
    gap: 1rem;
    display: flex;
    transition: .5s ease-in-out;
    &::-webkit-scrollbar {
      width: .2rem;
      &-thumb {
        background-color: #e81e8a;
        width: .1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background: #3ef788;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
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
      .selected {
      background-color: #197a17;
      }
    }
  }
  .currentUser {
    background-color: #3ef788;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: .5rem;
      .username {
        font-size: 1rem;
      }
    }
  }
`


const Contacts = ({contacts, currentUser, changeChat}) => {
  const [currentUserName, setCurrentUserName] = useState(undefined)
  const [currentUserImage, setCurrentUserImage] = useState(undefined)
  const [currentSelected, setCurrentSelected] = useState(undefined)

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage)
      setCurrentUserName(currentUser.username)
    }
  }, [currentUser])

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  }

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Maxify</h3>
          </div>
          <div className="contacts">
            {
              contacts.map((contact, index) => {
                return (
                  <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} 
                  onClick={() => changeCurrentChat(index, contact)}>
                    <div className="avatar">
                      <img src={`data:image/svg+xml;base64, ${contact.avatarImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="currentUser">
            <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
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

export default Contacts