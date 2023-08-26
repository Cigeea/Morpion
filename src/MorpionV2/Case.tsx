import React from "react";
import PLAYER from "./Player";

interface CaseProp{
    value:PLAYER|null,
    onClick:() => void
}

export default function Case({value,onClick}:CaseProp){
    return <button className="square" onClick={() => onClick()}>{value?PLAYER[value!]:''}</button>
}