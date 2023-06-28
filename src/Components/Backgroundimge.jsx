import React from 'react'
import Background from '../assets/home.jpg'
import styled from 'styled-components'
export default function Backgroundimge() {
  return (
    <Container>
      <img src={Background} alt="backgraund" />
    </Container>
  )
}

const Container = styled.div`
        height: 100vh;
        width: 100vw;
        img{
            height: 100vh;
            width: 100vw;

        }


        `