import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';

import Niveis from './components/Niveis/Niveis';
import NiveisRegister from './components/Niveis/NiveisRegister';
import NiveisList from './components/Niveis/NiveisList';
import NiveisEdit from './components/Niveis/NiveisEdit';

import Devs from './components/Devs/Devs';
import DevsRegister from './components/Devs/DevsRegister';
import DevsList from './components/Devs/DevsList';
import DevsEdit from './components/Devs/DevsEdit';

const App = () =>{
  return (
    <Router>
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route exact path='/' element={<Home />} /> 
          <Route exact path='/niveis' element={<Niveis/>} />
          <Route exact path='/niveis/register' element={<NiveisRegister/>} />
          <Route exact path='/niveis/list' element={<NiveisList/>} />
          <Route exact path='/niveis/edit/:nivelId' element={<NiveisEdit/>} />
          <Route exact path='/devs' element={<Devs/>} />
          <Route exact path='/devs/register' element={<DevsRegister/>} />
          <Route exact path='/devs/list' element={<DevsList/>} />
          <Route exact path='/devs/edit/:devId' element={<DevsEdit/>} />
        </Routes>
      </div>
    </div>
    </Router>
)};

export default App;