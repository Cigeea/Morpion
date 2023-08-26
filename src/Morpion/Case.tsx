import React from "react";
import Player from "./Player";

export type CaseType = Player | null;

export default function Case({value,onClick} : {value:CaseType,onClick:Function})  {
    return(
        <button className="square" onClick={() => onClick()}>{value ? Player[value]: ''}</button>
    )
}