import React from "react";
import Case, { CaseType } from "./Case";
import Player from "./Player";

interface BoardPropsType{
    nbLigne? : number, 
    nbColonnes?: number, 
    currentPlayer:Player, 
    onClick:Function,
    boardState: Array<CaseType>
}

export default function Board({boardState,nbLigne = 3,nbColonnes = 3,currentPlayer,onClick} : BoardPropsType){

    function Line({lineNumber} : {lineNumber:number}){
        let elements:React.JSX.Element[] = [];
        for(let i = 0; i<nbColonnes ; i++){
            elements.push(<Case key={nbColonnes*lineNumber + i} value={boardState[(nbColonnes*lineNumber + i)]} onClick={() => onClick(nbColonnes*lineNumber + i)}/>)
        }
        return (
            <div className="board-row">
                {elements}
            </div>
        )
    }

    let elements:React.JSX.Element[] = [];
    for(let i = 0; i<nbLigne; i++){
        elements.push(<Line key={i} lineNumber={i}/>)
    }

    return (
        <>
            {elements}
        </>
    );
}
