import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Niveis from './components/Niveis';
import NiveisCad from './components/NiveisCad';

const App = () =>{
  return (
    <Router>
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route exact path='/' element={<Home />} /> 
          <Route exact path='/niveis' element={<Niveis/>} />
          <Route exact path='/niveis/cadastrar' element={<NiveisCad/>} />
        </Routes>
      </div>
    </div>
    </Router>
)};

export default App;