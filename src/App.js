import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Niveis from './components/Niveis';
import NiveisRegister from './components/NiveisRegister';
import NiveisList from './components/NiveisList';
import NiveisEdit from './components/NiveisEdit';

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
        </Routes>
      </div>
    </div>
    </Router>
)};

export default App;