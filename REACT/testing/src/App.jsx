import React, {useState} from 'react'
import './App.css'


export default function App(){
  const [num, setNum] = useState(0);


  return (
    <div className='app-container'>
      <h3>React Counter Application</h3>
      <h1 className='counter-heading'>Current number: {num}</h1>
      <div className='button-container'>
      <button onClick={() => setNum(num + 1)} className='counter-button'>Add 1</button>
      <button onClick={() => setNum(num - 1)} className='counter-button'>Subtract 1</button>
      </div>
    </div>
  );
};
