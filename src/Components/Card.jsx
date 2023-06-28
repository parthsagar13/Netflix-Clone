import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../Utils/Firebase-confing";
import axios from "axios";

export default function Card({ movieData, isLiked = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [email ,setEmail] = useState(undefined);
  const navigate = useNavigate();


  onAuthStateChanged(firebaseAuth, (currentUser) => { 
    if (currentUser)  setEmail(currentUser.email)
    else navigate("/Signup");
  });

  const addToList = async () => {
    try{
      await axios.post("http://localhost:5000/api/user/add",{email,data:movieData})
    }catch(err){
      console.log(err);
    }
  }
  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="movies"
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="movies"
              onClick={() => navigate("/player")}
            />
            <video
              src={video}
              onClick={() => navigate("/player")}
              autoPlay
              muted
              loop
            />
          </div>
          <div className="info-container flex column">
            <h3 className="name" 
            onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icon flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  titel="play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill titel="Like" />
                <RiThumbDownFill titel="Dislike" />
                {isLiked ? (
                  <BsCheck titel="Remove from List" />
                ) : (
                  <AiOutlinePlus titel="Add to my list"  onClick={addToList}/>
                )}
              </div>
              <div className="info">
                <BiChevronDown titel="More Info" />
              </div>
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
     max-width: 230px;
    width: 206px;
    height: 118px;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 90;
    height: min-content;
    width: 17rem;
    position: absolute;
    top: -5vh;
    left: 0;
    border-radius: 0.4rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
    }
    .info-container{
      padding: 1rem;
      gap: 0.5rem;
    }
    .icon {
      .controls{
        display: flex;
        gap: 0.7rem;
      }
      svg{
        font-size: 1.3rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover{
          color: #b8b8b8;
        }
      }
    }
    .genres{
      ul{
          gap: 1rem;
          li{
            padding-right: 0.7rem;
            &:first-of-type{
              list-style-type: none;
            }
          }
      }
    }
  }
`;
