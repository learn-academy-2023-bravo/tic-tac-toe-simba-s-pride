import React, { useState } from 'react'
import Square from './components/Square'
import './App.css'

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [player1, setPlayer1] = useState({symbol: ("❌"), name: ("Player 1"), line: []})
  const [player2, setPlayer2] = useState({symbol: ("⭕"), name: "Player 2", line: []})
  const [currentPlayer, setCurrentPlayer] = useState(player1)
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ] 

  const handleGamePlay = (clickedSquare) => {
    let updateBoard = [...squares]
    if(currentPlayer === player1 && squares[clickedSquare] === (null)) {
      updateBoard[clickedSquare] = player1.symbol
    setSquares(updateBoard)
    let tempPlayer = player1
    tempPlayer.line.push(clickedSquare)
    setPlayer1(tempPlayer)
    
    for (let i = 0; i < winningCombos.length; i++) {
      let win = 0 
      console.log(win)
      console.log(currentPlayer.line)
      for (let x = 0; x < winningCombos[i].length; x++) {
        if (currentPlayer.line.includes(winningCombos[i][x])) {
          win = win + 1
        } if (win === 3) {
          alert("You Win!")
          return true
        }



      }
    }

    setCurrentPlayer(player2)
    } else if (currentPlayer === player2 && squares[clickedSquare] === (null)) {
      updateBoard[clickedSquare] = player2.symbol
    setSquares(updateBoard)
    let tempPlayer2 = player2
    tempPlayer2.line.push(clickedSquare)
    setPlayer2(tempPlayer2)
    setCurrentPlayer(player1)
    }
  
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="board">
      {
        squares.map((square, index) => {
          return <Square 
            square={square}
            index={index}
            key={index}
            handleGamePlay={handleGamePlay}
            />
        })
      }
      </div>
      <h2>{currentPlayer.name}</h2>
    </>
  )
}

export default App