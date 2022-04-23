import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import Logo from '../assets/logo.png'

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #3ef788;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.7rem;
    background-color: #441257;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      border: 0.1rem solid #fff;
      padding: 0.5rem;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #3ef788;
        outline: none;
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
    span {
      color: #fff;
      a {
        color: #3ef788;
        text-decoration: none;;
        font-size: 1.2rem;
      }
    }
  }
`

const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    alert("form")
  }
  const handleChange = (event) => {}
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="log0" />
            <h1>Maxify</h1>
          </div>
          <input 
            type="text" 
            placeholder="Username" 
            name="username" 
            onChange={e=>handleChange(e)} />
            <input 
            type="email" 
            placeholder="Email" 
            name="email" 
            onChange={e=>handleChange(e)} />
            <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            onChange={e=>handleChange(e)} />
            <input 
            type="password" 
            placeholder="Confirm Password" 
            name="confirmPassword" 
            onChange={e=>handleChange(e)} />
            <button type='submit'>Create User</button>
            <span>Already have an account? - <Link to='/login'>Login</Link></span>
        </form>
      </FormContainer>
    </>
  )
}

export default Register