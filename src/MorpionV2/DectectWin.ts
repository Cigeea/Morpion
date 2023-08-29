import PLAYER from "./Player";

interface PropType{
    board:(PLAYER|null)[];  //  Tableau de jeu
    nLig:number;    //Nb de Ligne
    nCol:number;    //Nb de Colonne
    i:number;        //Index de la case jouée
    nbAlignWin: number;     //Nbr de case alignées pour gagner
}

const direction = {
    //direction: [colonne,ligne]        //TODO need to define a type? Force [number,number]
    left: [-1,0],
    right: [1,0],
    up: [0,-1],
    down: [0,1],
    top_left: [-1,-1],
    top_right: [1,-1],
    bot_left: [-1,1],
    bot_right: [1,1]
}

interface LineDirection{
    // sens1 : [number,number],         //Can't use tuples here? Compiler has no info on direction properties
    // sens2 : [number,number]
    sens1 : number[],
    sens2 : number[]
}

const horizontal:LineDirection = {
    sens1 : direction.left,
    sens2 : direction.right,
}

const vertical:LineDirection = {
    sens1 : direction.up,
    sens2 : direction.down,
}

const diagTopLeft:LineDirection = {
    sens1 : direction.top_left,
    sens2 : direction.bot_right,
}

const diagTopRight:LineDirection = {
    sens1 : direction.top_right,
    sens2 : direction.bot_left,
}

export default function detectWin(prop:PropType):boolean{
    let {board,nLig,nCol,i,nbAlignWin} = prop;     //convenience destruct
    if(board.length !== nLig*nCol){
        throw new Error('Board size not correct : ' + board.length + ' != ' + nLig + ' * ' + nCol);
    }
    if(board[i] === null || board[i] === undefined){
        throw new Error('Index ' + i + ' doesn\'t represent a valid move')
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //TODO
    //The whole point of the above fail fast was to type guard against null
    //it doesn't seem to work as we need the ! after board[i]
    const player:PLAYER = board[i]!;
    const newProps:PropType & {player:PLAYER} = {...prop,player:player};
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //Experimenting with TS types and enhancing PropType with a player prop
    //Is there a shorter way to do it?
    //I mean we could definitely do dectWin(Horizontal,prop,player) anyway
    return (
        caseSimilaire(horizontal,newProps).length >= nbAlignWin ||
        caseSimilaire(vertical,newProps).length >= nbAlignWin ||
        caseSimilaire(diagTopLeft,newProps).length >= nbAlignWin ||
        caseSimilaire(diagTopRight,newProps).length >= nbAlignWin);
}

/**
 * Given the board, the index of the last move and the line to check
 * Returns an array of adjacent cases with the same value as board[i]
 */
function caseSimilaire(dir:LineDirection,props:PropType & {player:PLAYER}):number[]{
    const {i,nCol,board,player} = props;
    const ret:number[] = [i];
    checkSens(dir.sens1);
    checkSens(dir.sens2);
    return [...new Set(ret)];       //Removes duplicates

    function checkSens(sens:number[]) {
        let newidx = i + sens[0] + sens[1] * nCol;
        while(board[newidx] === player && sameLine(newidx,i)){            
            ret.push(newidx);
            newidx = newidx + sens[0] + sens[1] * nCol;
            // caseSimilaire(dir,{...props,i:newidx});     //On appelle récursivement la fct avec l'index mis à jour, cool syntax à tester
        }
    }

    function sameLine(idx1:number,idx2:number){
        return Math.floor(idx1/nCol) === Math.floor(idx2/nCol);
    }
}


