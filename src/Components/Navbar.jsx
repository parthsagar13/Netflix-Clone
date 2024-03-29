import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {FaSearch} from "react-icons/fa"
import {FaPowerOff} from "react-icons/fa"
import logo from "../assets/Logo.png"
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from '../Utils/Firebase-confing';
export default function Navbar({ isScrolled }) {
    const links = [
        { name: "Home", link: "/"},
        { name: "TV Shows", link: "/tv"},
        { name: "Movie", link: "/movies"},
        { name: "My List", link: "/mylist"},
    ]
    
    
    const [showSearh, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);
    
    const navigate = useNavigate('');
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(!currentUser) navigate("/login")
      })
  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex `}>
<div className="left flex a-center">
             <div  className="brand flex a-center j-center">
                <img src={logo} alt="logo"/>
             </div>
             <ul className="links flex">
                {
                      links.map(({name,link}) => {
                        return (
                            <li key={name}>
                                <Link to={link}>{name}</Link>
                            </li>
                        )
                      })            
                }
</ul>
</div>
             <div className="right flex a-center">
                <div className={`search ${showSearh ?  "show-search" : ""}`}>
                    <button  
                    onFocus={() => setShowSearch(true) }
                    onBlur={() => {
                        if(!inputHover) setShowSearch(false);
                    }}>
                        <FaSearch/>
                    </button>
                    <input 
                        type="text" 
                        placeholder='Search'
                        onMouseEnter={() => setInputHover(true)}
                        onMouseLeave={() => setInputHover(false)}
                        onBlur={() => {
                            setShowSearch(false)
                            setInputHover(false)
                        }}
                        />
                </div>
                <button onClick={() => signOut(firebaseAuth)}>
                    <FaPowerOff />
                </button>
            </div>
        
      </nav>
    </Container>
  )
}
 
const Container = styled.div`
  .scrolled {
    background-color: rgb(0 0 0  / 85%);
    
  }
  nav {
    position: sticky;
    top: 0;
    height: 4.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 6rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:Focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:Focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:Focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
         
        }
      }
    }
  }

`;