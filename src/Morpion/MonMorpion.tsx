import React, { useState } from "react";
import Player from './Player';

import Board from "./Board";
import { CaseType } from "./Case";
import checkWin from "./WinConditionChecker"


export default function MonMorpion(){

    const nbLigne = 5;
    const nbCol = 5;
    const nbAlignWin = 4;   //Nombre de case alignees necessaire pour la win

    const [currentPlayer,setPlayer] = useState(Player.X);
    const [winner,setWinner] = useState<Player|null>(null);
    const [history,setHistory] = useState<Array<CaseType[]>>([Array(nbLigne*nbCol).fill(null)]);
    const [turn,setTurn] = useState(0);
    const [boardState,setBoardState] = useState<CaseType[]>(history[turn]);
    
    function onCaseClick(i:number){
        if(boardState[i] === null && winner === null){
            let newState:CaseType[] = boardState.slice();
            newState[i] = currentPlayer;
            setBoardState(newState);
            const nextHistory = [...history.slice(0,turn+1),newState];
            setHistory(nextHistory);
            setTurn(nextHistory.length-1);
            if(checkWin({i,newState,nbLigne,nbCol,nbAlignWin})){
                setWinner(currentPlayer);
            }
            else{
                setPlayer(Player.swap(currentPlayer));
            }
        }
    }

    return (
        <div>
            <h1>'Mon Morpion'</h1>
            <div>{winner? 'Victoire de ':'Tour de '}  <b>{currentPlayer}</b></div>
            <Board nbLigne={nbLigne} nbColonnes={nbCol} boardState={boardState} currentPlayer={currentPlayer} onClick={onCaseClick}/>
        </div>
    )
}



