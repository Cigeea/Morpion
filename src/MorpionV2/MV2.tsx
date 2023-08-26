import React, { useState } from "react";
import Tableau from "./Tableau";
import PLAYER from "./Player";
import switchPlayer from "./PlayerHelper";
import Historique from "./Historique";
import detectWin from "./DectectWin";

export interface Histo{
    board:(PLAYER|null)[],
    player: PLAYER
}

export default function MV2(){
    const nbLignes = 6;
    const nbCol = 6;
    const nbAlignWin = 3;
    const [currentPlayer,setCurrentPlayer] = useState(PLAYER.X);
    const initialHisto:Histo = {
        board: Array(nbLignes*nbCol).fill(null),
        player: currentPlayer
    }
    const [histo,setHisto] = useState<Histo[]>([initialHisto]);
    const [cases,setCases] = useState<(PLAYER|null)[]>(Array(nbLignes*nbCol).fill(null));
    const [moveNb,setMoveNb] = useState(0);
    
    
    function onClickHisto(i:number){
        setCases(histo[i].board);
        setCurrentPlayer(histo[i].player);
        setMoveNb(i);
    }

    function onClickCase(i:number){
        if(cases[i] === null){
            let newCases = cases.slice();   //For immutability
            newCases[i] = currentPlayer;
            setCases(newCases);
            const nextPlayer:PLAYER = switchPlayer(currentPlayer);
            setCurrentPlayer(nextPlayer);
            const newHisto = [...histo.slice(0,moveNb+1),{board:newCases,player:nextPlayer}]
            //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            //TODO
            //currentPlayer must have switched at this point (newHisto)
            //but calling setCurrentPlayer before this line doesn't update the player
            //hence we have to call nextPlayer instead of currentPlayer 
            setHisto(newHisto);
            setMoveNb(moveNb+1);
            if(detectWin({board :newCases,nLig:nbLignes,nCol: nbCol,i,nbAlignWin})){
                console.log('WON')
            }
            // setMoveNb(newHisto.length-1);
        }
    }

    return(
        <>
        <Tableau nbCol={nbCol} nbLignes={nbLignes} value={cases} onClick={onClickCase}/>
        <Historique lignes={histo} onClick={onClickHisto}/>
        </>
    )
}