import React, {useState} from 'react'
import './App.css'
import Fruits from './Fruits'
import FruitsCounter from './FruitsCounter';


export default function App(){
  const [fruits] = React.useState([
        {fruitName: 'apple', id:1},
        {fruitName: 'apple', id:2},
        {fruitName: 'plum', id:3},
    ]);

  return (
    <>
      <h1>Where should the state go ?</h1>
      <Fruits fruits={fruits}/>
      <FruitsCounter fruits={fruits} />
 
    
    </>
  );
};
