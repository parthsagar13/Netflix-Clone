import React, { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import Backgroundimge from "../Components/Backgroundimge";
import Heder from "../Components/Heder";
import { firebaseAuth } from "../Utils/Firebase-confing";
// import { current } from '@reduxjs/toolkit'
import { useNavigate } from "react-router-dom";
import showPwdImg from '../assets/show-password.svg';
import hidePwdImg from '../assets/hide-password.svg';


export default function Login() {
  const navigate = useNavigate();
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  
  const validation = (fieldName, value) => {
    switch (fieldName) {
      case "email":
        return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      case "password":
        return value.length >= 6;
      default:
        break;
    }
  
  };
  onAuthStateChanged(firebaseAuth, (currentUser) => { 
    if (currentUser) navigate("/");
  });
  const handleLogIn = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {

    if (!validation("email", formValues.email) || !validation("password", formValues.password)) {
      setEmailValid(validation("email", formValues.email));
      setPasswordValid(validation("password", formValues.password));
      return;
    }
  };
  }

  return (
    <Container>
      <Backgroundimge />
      <div className="containt">
        <Heder />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="titel">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
            {!emailValid && (
              <p className="text-danger">Email is invalid/blank</p>
            )}
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              {!passwordValid && (<p className="text-danger">Password is invalid/blank</p>)}
              <div className="App">
              <div className="pwd-container">
              <input
                type={isRevealPwd ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
                />
                {/* eslint-disable-next-line */}
                <img
                  title={isRevealPwd ? 'Hide password' : 'Show password'}
                  src={isRevealPwd ? showPwdImg : hidePwdImg}
                  onClick={() => setIsRevealPwd(prevState => !prevState)}
                />
                </div>
                </div>
              <button onClick={handleLogIn}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .containt {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        gap: 2rem;
        color: white;
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
          body {
  
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

.pwd-container {
  position: relative;
  width: 192px;
}

.pwd-container input {
  padding: 9px 133px 5px 9px;
  font-size: 15px;
  border-radius: 4px;
}

.pwd-container img {
  cursor: pointer;
  position: absolute;
  width: 20px;
  right: -32px;
  top: 8px;
}
.text-danger{
  color: #e50914;
  margin: -16px 0;
    margin-bottom: -25px;
}
        }
      }
    }
  }
`;
