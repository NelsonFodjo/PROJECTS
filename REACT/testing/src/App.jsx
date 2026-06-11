

function App() {
  const handleClick = () => {
    let randomNum = Math.floor(Math.random() * 3) + 1;
    let userInput = prompt("Type a number");
    alert(`Computer number: ${randomNum}, Your gyess: ${userInput}`);
  };

  return (
    <div>
      <h1>Number guessing game</h1>
      <button onClick={handleClick}>Guess a number between 1 and 3</button>
    </div>

  );
}

export default App
