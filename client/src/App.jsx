import './App.css'
import { Route, Routes } from 'react-router-dom'
import React, {lazy, Suspense} from 'react'
import Home from './Components/Home/Home'
import LandingPage from './Components/LandingPage/LandingPage'
import GameDetail from './Components/GameDetail/GameDetail'
import Form from './Components/Formulario/Form'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  return (
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/game/:id" element={<GameDetail/>}/>
        <Route path="/form" element={<Form/>}/>
      </Routes>
  )

}

export default App
