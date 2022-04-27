import React from 'react'
import styled from 'styled-components'
import Hello from '../assets/hello.gif'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img {
        height: 15rem;
    }
    span {
        color: #47ed8a;
    }
`

const Welcome = ({currentUser}) => {
  return (
    <>
        <Container>
            <img src={Hello} alt="hello" />
            <h1>Hello, <span>{currentUser.username}</span></h1>
            <h3>Please, select a chat!</h3>
        </Container>
    </>
  )
}

export default Welcome