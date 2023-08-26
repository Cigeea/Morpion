enum Player {
    X = 'X',
    O = 'O',
    I = 'I'
}

namespace Player {
    export function swap(player: Player): Player {
        if(player === Player.X){
            return Player.O;
        }
        else if(player === Player.O){
            return Player.I;
        }
        else{
            return Player.X;
        }
    }
}

export default Player;