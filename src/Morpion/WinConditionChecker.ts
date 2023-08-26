import { CaseType } from "./Case";
import Direction, {boardIndexRecord} from "./Direction";
import Player from "./Player";

interface propType {
    i:number,                   //Index de la case qui vient d'être jouée
    newState: CaseType[], 
    nbLigne:number, 
    nbCol:number,
    nbAlignWin: number,
    player?:Player
}

    export default function checkWin(props:propType):boolean{
        if(props.newState[props.i] === null || props.newState[props.i] === undefined){
            return false;
        }
        const player:Player = props.newState[props.i]!;
        props.player = player;
        return checkHoriz(props) || checkVerti(props) || checkDiagTopLeft(props) || checkDiagTopRight(props);
    }

    function checkHoriz(props:propType): boolean {
        return count(Direction.LEFT,props) + count(Direction.RIGHT,props) >= props.nbAlignWin-1;
    }

    function checkVerti(props:propType): boolean {
        return count(Direction.UP,props) + count(Direction.DOWN,props) >= props.nbAlignWin-1;
    }
    
    function checkDiagTopLeft(props:propType): boolean {
        return count(Direction.TOP_LEFT,props) + count(Direction.BOT_RIGHT,props) >= props.nbAlignWin-1;
    }
    
    function checkDiagTopRight(props:propType): boolean {
        return count(Direction.TOP_RIGHT,props) + count(Direction.BOT_LEFT,props) >= props.nbAlignWin-1;
    }

    /**
     * Compte combien de case du meme type dans la direction donnée
     */
    function count(dir : Direction,prop :propType): number {
        let total = 0;
        const [x,y] = boardIndexRecord[dir];
        const newIndex:number = prop.i + x*prop.nbCol + y;     //On se decale d'un nombre de ligne et de colonne en fonction de la direction
        const newProp = {...prop};
        newProp.i = newIndex;
        let caseToValidate:CaseType = prop.newState[prop.i + x*prop.nbCol + y];
        if(caseToValidate === prop.player){  //Si la case dans la direction est du bon type, on incrémente et on relance
            total ++;
            total += count(dir,newProp)
        }
        return total;
    }