
import React from 'react'
import {  Routes,Route, BrowserRouter } from 'react-router-dom';
import Card2 from './Pages/Card2';
import Card3 from './Pages/Card3';
import Login from './Pages/Login';
import Movies from './Pages/Movies';
import Netflix from './Pages/Netflix';
import Player from './Pages/Player';
import Signup from './Pages/Signup';
import TVShows from './Pages/TVShows';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/player' element={<Player/>}/>
        <Route exact path='/movies' element={<Movies/>}/>
        <Route exact path='/tv' element={<TVShows/>}/>
        <Route exact path='/' element={<Netflix/>}/>
        <Route exact path='/card2' element={<Card2/>}/>
        <Route exact path='/card3' element={<Card3/>}/>
        <Route exact path='/Signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

