import React, {useState} from 'react'
import './App.css'
import Fruits from './Fruits'
import FruitsCounter from './FruitsCounter';
import Homepage from './Homepage';
import AboutLittleLemon
 from './AboutLIttleLemon';
import Contact from './Contact';
import {Route, Link, Routes} from 'react-router-dom'
import './App.css'



export default function App(){
  return (
    <>
      <nav>
        <Link to="44" className="nav-item" >Homepage</Link>
        <Link to="/about" className="nav-item" >About Little Lemon</Link>
        <Link to="/contact" className="nav-item">Contact</Link>
      </nav>

      <Routes>
        <Route path="44" element={<Homepage />} ></Route>
        <Route path="/about" element={<AboutLittleLemon />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    
    </>
  );
};
