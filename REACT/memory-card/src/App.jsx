import GameHeader from "./components/GameHeader"
import Card from "./components/Card"
import { useEffect, useState } from "react"

const cardValues = [
  "😀","🎉","🐱","🍎","🚀","🌟","🎵","❤️",
  "😀","🎉","🐱","🍎","🚀","🌟","🎵","❤️"
]


function App() {

  const [cards, setCards] = useState([]);

  const initializeGame = () =>{
    //shuffle the cards
    
    const finalCards = cardValues.map((value, index) => ({
      id : index,
      value,
      isFlipped : false,
      isMatched: false,
      }
    ));

    setCards(finalCards)
  };

  useEffect(() => {
    initializeGame()
  }, [])

const handleCardClick = (card) => {
  // do not allow clicking if the card is flipped or matched.
  if (card.isFlipped || card.isMatched) {
    return;
  }
  // update the flipped state
  const newCards = cards.map((c) => {
    if(c.id === card.id){
      return{...c, isFlipped: true}
    }
    else{
      return c;
    }
  })
}

  return (
    <>
      <GameHeader score={3} moves={10}/>

      <div className="cards-grid">
        {cardValues.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
    </>
  )
}

export default App
