import React, { MouseEventHandler } from "react";
import { useState } from 'react';

type Player = 'X' | 'O';
type CaseType = Player | null;

interface SquarePropType {
  value: CaseType;                      //valeur de la case
  onSquareClick: MouseEventHandler;     //ce qui se passe quand on clique dessus
}

interface BoardPropType {
  turn: Player;                      
  squares: Array<CaseType>;
  onPlay: Function;
}

export default function Game() {
  const [history, setHistory] = useState<Array<CaseType[]>>([Array(9).fill(null)]);
  const [turn,setTurn] = useState<Player>('X');
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: Array<CaseType>) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    changeTurn();
  }

  function changeTurn() {
    if (turn === 'X') {
      setTurn('O');
    }
    else {
      setTurn('X');
    }
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setTurn(nextMove % 2 === 0? 'X':'O');
  }

  const moves: React.JSX.Element[] = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });


  return (
    <div className="game">
      <div className="game-board">
          <Board turn={turn} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Square(props : SquarePropType) {
  return <button className="square" onClick={props.onSquareClick}>{props.value}</button>;
}

function Board({turn,squares,onPlay} : BoardPropType) {
  const winner = calculateWinner(squares);
  function handleClick(i: number) {
    if (squares[i] || winner != null) {     //Si la case est deja remplie ou que le jeu est terminé
      return;
    }
    const nextSquares = squares.slice();    //immutability
    nextSquares[i] = turn;
    onPlay(nextSquares);
  }

  
  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + turn;
  }

  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
    </>
  );
}

function calculateWinner(squares: Array<CaseType>): CaseType {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}




