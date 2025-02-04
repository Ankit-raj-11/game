import { useEffect, useState, setTurn } from 'react'
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "scr": "/Img/helmet-1.png", matched:false},
  { "scr": "/Img/potion-1.png", matched:false},
  { "scr": "/Img/ring-1.png", matched:false},
  { "scr": "/Img/scroll-1.png", matched:false},
  { "scr": "/Img/shield-1.png", matched:false},
  { "scr": "/Img/sword-1.png", matched:false},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurn] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() -0.5)
    .map((card) => ({...card, id: Math.random() }))

    setCards(shuffledCards)
    setTurn(0)
  }

//Handle a card
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
   
 //compare two selected card
  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.scr === choiceTwo.scr){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.scr === choiceOne.scr){
              return {...card, matched: true}
            }else{
              return card 
            }
          })
        })
        resetTurn()
      }else{
        setTimeout( () => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)
  
//Reset choice and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurn(prevTurn => prevTurn + 1)
    setDisabled(false)
  }

  return (
    <div className="App">
     <h1>Magic Match</h1>
     <button onClick={shuffleCards}>New Game</button>

     <div className="card-grid">
      {cards.map(card => (
       < SingleCard 
       key={card.id} 
       card = {card} 
       handleChoice = {handleChoice}
       flipped = {card === choiceOne || card === choiceTwo || card.matched}
       disabled={disabled}
       />
      ))}
     </div>
     <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
