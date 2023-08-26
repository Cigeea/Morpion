import React from "react";
import PLAYER from "./Player";
import Case from "./Case";

interface TableauProp{
    value:(PLAYER|null)[],
    nbLignes?:number,
    nbCol?:number
    onClick:(i:number) => void
}

export default function Tableau({value,onClick,nbLignes=3,nbCol=3} : TableauProp){
    function renderLine(lineNumber:number){
        let elements:React.JSX.Element[] = [];
        for(let i= 0 + nbCol*lineNumber; i<nbCol*(lineNumber+1); i++){
            elements.push(<Case key={i} value={value[i]} onClick={() => onClick(i)}/>)
        }
        return(
            <div key={lineNumber} className="board-row">
                {elements}
            </div>
        )
    }

    let lines:React.JSX.Element[] = [];
    for(let i = 0; i<nbLignes; i++){
        lines.push(renderLine(i));
    }

    return (
        <div className="game-board">
            {lines}
        </div>
    )
}

