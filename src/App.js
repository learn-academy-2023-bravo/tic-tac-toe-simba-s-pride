import React, { useState } from "react";
import Square from "./components/Square";
import "./App.css";

const App = () => {

  const [gameWon, setGameWon] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(null));
  
  const [player1, setPlayer1] = useState({
    symbol: "❌",
    name: "Player 1",
    line: [],
  });

  const [player2, setPlayer2] = useState({
    symbol: "⭕",
    name: "Player 2",
    line: [],
  });

  // let choice = window.prompt('Player 1, do you want to be X? Y/N')
  // const symbolChoice = () => {
  //   if(choice === 'N' || choice === 'n'){
  //     let playerChoice = player1
  //     setPlayer1(playerChoice.symbol = '⭕')
  //     let playerChoice2 = player2
  //     setPlayer2(playerChoice2.symbol = '❌')
  //   }
  // }

  const [currentPlayer, setCurrentPlayer] = useState(player1);

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const reset = () => {
    setSquares(Array(9).fill(null));
    setGameWon(false);

    let tempPlayer = player1;
    tempPlayer.line = [];
    setPlayer1(tempPlayer);

    let tempPlayer2 = player2;
    tempPlayer2.line = [];
    setPlayer2(tempPlayer2);

    setCurrentPlayer(player1);
  };

  const checkWin = (currentPlayer) => {
    for (let i = 0; i < winningCombos.length; i++) {
      let win = 0;
      for (let x = 0; x < winningCombos[i].length; x++) {
        if (currentPlayer.line.includes(winningCombos[i][x])) {
          win = win + 1;
        }
        if (win === 3) {
          setTimeout(() => {
            alert(`${currentPlayer.name} Wins!!!`);
          }, 50);
          setGameWon(true);
          return true;
        }
      }
    }
  };

  const checkDraw = () => {
    let tempArray = squares.filter((value) => value === null);
    if ((tempArray.length-1)=== 0) {
      setTimeout(() => {
        alert(`Nobody Wins!!!`);
      }, 50);
      setGameWon(true);
      return true;
    }
  };

  const handleGamePlay = (clickedSquare) => {
    if (gameWon === true) {
      return true;
    }

    let updateBoard = [...squares];
    if (currentPlayer === player1 && squares[clickedSquare] === null) {
      updateBoard[clickedSquare] = player1.symbol;
      setSquares(updateBoard);
      let tempPlayer = player1;
      tempPlayer.line.push(clickedSquare);
      setPlayer1(tempPlayer);
      if (checkWin(currentPlayer) !== true) {
        checkDraw()
        setCurrentPlayer(player2);
      }
    } else if (currentPlayer === player2 && squares[clickedSquare] === null) {
      updateBoard[clickedSquare] = player2.symbol;
      setSquares(updateBoard);
      let tempPlayer2 = player2;
      tempPlayer2.line.push(clickedSquare);
      setPlayer2(tempPlayer2);
      if (checkWin(currentPlayer) !== true) {
        checkDraw()
        setCurrentPlayer(player1);
      }
    }
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {squares.map((square, index) => {
          return (
            <Square
              square={square}
              index={index}
              key={index}
              handleGamePlay={handleGamePlay}
            />
          );
        })}
      </div>
      <h2>{currentPlayer.name}</h2>
      <button onClick={reset}>RESET</button>
      <footer>Created By: DeMario, Nikki, Sam</footer>
    </>
  );
};
export default App;