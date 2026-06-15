import GameHeader from "./components/GameHeader"
import Card from "./components/Card"
import { use, useEffect, useState } from "react"

const cardValues = [
  "😀","🎉","🐱","🍎","🚀","🌟","🎵","❤️",
  "😀","🎉","🐱","🍎","🚀","🌟","🎵","❤️"
]

function App() {

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([])
  const [score, setScore] = useState(0)
  const [isChecking, setIsChecking] = useState(false)

  const initializeGame = () => {
    //shuffling to be done later

    const finalCards =  cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

  setCards(finalCards)
  };

  useEffect(() => { initializeGame() }, [])

  const handleCardClick = (card) => {
  // do not allow clicking if the card is flipped or matched.
  if (card.isFlipped || card.isMatched || isChecking) {
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
  setCards(newCards)

  const newFlippedCards = [...flippedCards, card.id]
  console.log(newFlippedCards)

  setFlippedCards(newFlippedCards)
  //check for a match if two cards are fillped
  if(newFlippedCards.length === 2){
    const firstCard = cards.find(c => c.id === newFlippedCards[0])
    
    if (firstCard.value === card.value){
      setScore(score + 1)
      setFlippedCards([])
      const newCards = cards.map((c) => {
        if(c.id === card.id){
          return{...c, isFlipped: true, isMatched: true}
        }
        else{
          return c
        }
      })
      setCards(newCards)
      
    } else {
      setIsChecking(true)
      setTimeout(() => {
        setCards(prev => prev.map(c =>
          newFlippedCards.includes(c.id ? { ...c, isFlipped: false} : c)
        ))
        setFlippedCards([])
        setIsChecking(false)
      }, 1000)
    }
  }

  }

  



  return (
    <>
      <GameHeader score={score} moves={0}/>

      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </>
  )
}

export default App
