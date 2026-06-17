// import React, {useState} from 'react'
// import './App.css'
// import Fruits from './Fruits'
// import FruitsCounter from './FruitsCounter';
// import Homepage from './Homepage';
// import AboutLittleLemon
//  from './AboutLIttleLemon';
// import Contact from './Contact';
// import {Route, Link, Routes} from 'react-router-dom'
// import './App.css'



// export default function App(){
//   return (
//     <>
//       <nav>
//         <Link to="44" className="nav-item" >Homepage</Link>
//         <Link to="/about" className="nav-item" >About Little Lemon</Link>
//         <Link to="/contact" className="nav-item">Contact</Link>
//       </nav>

//       <Routes>
//         <Route path="44" element={<Homepage />} ></Route>
//         <Route path="/about" element={<AboutLittleLemon />}></Route>
//         <Route path="/contact" element={<Contact />}></Route>
//       </Routes>
    
//     </>
//   );
// };

export default function App(){
  const nelco = [
    {name: "nelson", age: 21, school: "ALCHE", weight: 200},
    {name: "maria", age: 19, school: "NORTHERN", weight: 150},
    {name: "james", age: 23, school: "EASTWOOD", weight: 180},
    {name: "sophia", age: 20, school: "WESTRIDGE", weight: 135},
    {name: "liam", age: 22, school: "MIDTOWN", weight: 175},
    {name: "olivia", age: 18, school: "SUNRISE", weight: 120},
    {name: "noah", age: 24, school: "HARBOR", weight: 190},
    {name: "emma", age: 21, school: "CRESCENT", weight: 140},
    {name: "mason", age: 25, school: "RIDGEVIEW", weight: 205},
    {name: "ava", age: 22, school: "PARKSIDE", weight: 130},
    {name: "ethan", age: 20, school: "BRIDGEPORT", weight: 165}
  ]

  const highWeight = nelco.filter((n) => 
  {
    return n.weight > 150;
  });

  return(
    
  )
}


