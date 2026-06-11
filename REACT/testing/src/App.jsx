import React, {useState} from 'react'

 export default function App() {

  const [winner, setWinner] = useState("Mexico");
  const [inputText, setInputText] = useState('hello')

  const handleClick = () => {
    setWinner((prevWinner) =>
      prevWinner === "Mexico" ? "South Africa" : "Mexico"
    );
  };

  const handleChange = () =>{
    setInputText(event.target.value);
  };

  return (
    <div>
      <h3>Who do you think will win the world cup?</h3>
      <h1>{winner} will win!</h1>
      <button onClick={handleClick}>Change</button>
      <h2>Now let's explore some typing</h2>
      <input value={inputText} onChange={handleChange}/>
      <h1>You typed: {inputText}</h1>
    </div>
  );
}
