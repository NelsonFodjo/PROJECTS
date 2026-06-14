import GameHeader from "./components/GameHeader"
import Card from "./components/Card"
import { useEffect, useState } from "react"

const cardValues = [
  "😀","🎉","🐱","🍎","🚀","🌟","🎵","❤️",
  "😀","🎉","🐱","🍎","🚀","🌟","🎵","❤️"
]

function App() {

  // // initialize cards lazily to avoid calling setState inside useEffect
  // const [cards, setCards] = useState(() => {
  //   // simple shuffle helper
  //   const shuffled = [...cardValues]
  //     .map((v) => ({ v, sort: Math.random() }))
  //     .sort((a, b) => a.sort - b.sort)
  //     .map((x) => x.v);

  //   return  cardValues.map((value, index) => ({
  //     id: index,
  //     value,
  //     isFlipped: false,
  //     isMatched: false,
  //   }));
  // });
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([])

  const initializeGame = () => {
    //shuffling to be done later

    const finalCards =  cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

  setCards(finalCards)

  const newFlippedCards =[...flippedCards, cards.id]
  setFlippedCards(newFlippedCards)

  //check for match if two cards are flipped

  if (flippedCards.length === 1){
    const firstCard = cards[flippedCards[0]];
    if (firstCard.value === cards.value){
      alert("match")
    }
  }
  };

  useEffect(() => { initializeGame() }, [])

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
  setCards(newCards)
  
  const newFlippedCards = [...flippedCards, card.id]
  console.log(flippedCards)
  setFlippedCards(newFlippedCards)
  //check for a match if two cards are fillped
  if(flippedCards.length === 1){
    const firstCard = cards[flippedCards[0]]

    if (firstCard.value === card.value){
      alert("match")
    }
  }

  }

  



  return (
    <>
      <GameHeader score={3} moves={10}/>

      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </>
  )
}

export default App
