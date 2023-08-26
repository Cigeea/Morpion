enum Direction {
    RIGHT,
    LEFT,
    UP,
    DOWN,
    TOP_LEFT,
    TOP_RIGHT,
    BOT_LEFT,
    BOT_RIGHT
}

/**
 * Associe à chaque direction une paire [i,j]
 * i indique de combien de lignes on se décale (-1 => on remonte d'une ligne, 1 => on descend)
 * j indique de combien de colonnes on se décale (-1 => on décale à gauche, 1 => on décale à droite)
 */
export const boardIndexRecord:Record<Direction,[number,number]> = {
    [Direction.RIGHT] : [0,1],
    [Direction.LEFT] : [0,-1],
    [Direction.UP] : [-1,0],
    [Direction.DOWN] : [1,0],
    [Direction.TOP_LEFT] : [-1,-1],
    [Direction.TOP_RIGHT] : [-1,1],
    [Direction.BOT_LEFT] : [1,-1],
    [Direction.BOT_RIGHT] : [1,1]
}

export default Direction;
