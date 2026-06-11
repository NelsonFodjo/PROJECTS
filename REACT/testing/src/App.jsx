import React, {useState} from 'react'

function App() {
  const [winner, setWinner] = useState("Mexico");

  const handleClick = () => {
    setWinner((prevWinner) =>
      prevWinner === "Mexico" ? "South Africa" : "Mexico"
    );
  };

  return (
    <div>
      <h3>Who do you think will win the world cup?</h3>
      <h1>{winner} will win!</h1>
      <button onClick={handleClick}>Change</button>
    </div>
  );
}

export default App

function handleLight(){
  setLightOn((currentState) =>
    currentState === true ? false : true
  );
};

<button onClick={handleLight}>Switch</button>