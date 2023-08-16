import { useState } from "react";
import confetti from "canvas-confetti";
import "./App.css";
import { Square } from "./components/Square";
import { TURNS } from "./constants.js";
import { checkWinner,checkEndGame } from "./utils/board";
import { WinnerModal } from "./components/WinnerModal.jsx";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, SetWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    SetWinner(null);
  };


  //Los estados siempre hay que tratarlos como inmutables porque puede haber problemas de renderizado
  const updateBoard = (index) => {
    //no actualizamos si hay algo
    if (board[index] || winner) return;
    //actualizar el tablero
    const newBoard = [...board]; // spread operator
    newBoard[index] = turn;
    setBoard(newBoard);
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      SetWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      SetWinner(false); //empate
    }
  };

  return (
    <main className="board">
      <h1>Ta-te-ti</h1>
      <button onClick={resetGame}>Resetear</button>

      {/* {renderizar cada uno de los square dentro del tablero} */}
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              /* {le paso la funcion updateBoard como prop a square} */
              updateBoard={updateBoard}
            >
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame}/>

    </main>
  );
}

export default App;
