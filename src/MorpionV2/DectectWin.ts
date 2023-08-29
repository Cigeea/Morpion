import PLAYER from './Player'

interface GameState {
	board: (PLAYER | null)[][] //  Tableau de jeu
	i: number //Index ligne de la case jouée
	j: number //Index colonne de la case jouée
	nbAlignWin: number //Nbr de case alignées pour gagner
}

const direction = {
	//direction: [colonne,ligne]        //TODO need to define a type? Force [number,number]
	left: [-1, 0],
	right: [1, 0],
	up: [0, -1],
	down: [0, 1],
	top_left: [-1, -1],
	top_right: [1, -1],
	bot_left: [-1, 1],
	bot_right: [1, 1],
}

interface LineDirection {
	// sens1 : [number,number],         //Can't use tuples here? Compiler has no info on direction properties
	// sens2 : [number,number]
	sens1: number[]
	sens2: number[]
}

const horizontal: LineDirection = {
	sens1: direction.left,
	sens2: direction.right,
}

const vertical: LineDirection = {
	sens1: direction.up,
	sens2: direction.down,
}

const diagTopLeft: LineDirection = {
	sens1: direction.top_left,
	sens2: direction.bot_right,
}

const diagTopRight: LineDirection = {
	sens1: direction.top_right,
	sens2: direction.bot_left,
}

export default function detectWin(prop: GameState): boolean {
	let { board, i, j, nbAlignWin } = prop //convenience destruct
	if (board[i][j] === null || board[i][j] === undefined) {
		throw new Error('Index ' + i + ',' + j + " doesn't represent a valid move")
	}
	//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	//TODO
	//The whole point of the above fail fast was to type guard against null
	//it doesn't seem to work as we need the ! after board[i]
	const player: PLAYER = board[i][j]!
	const newProps: GameState & { player: PLAYER } = { ...prop, player: player }
	//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	//Experimenting with TS types and enhancing GameState with a player prop
	//Is there a shorter way to do it?
	//I mean we could definitely do dectWin(Horizontal,prop,player) anyway
	return (
		nbCaseSimilaireByDirection(horizontal, newProps) >= nbAlignWin ||
		nbCaseSimilaireByDirection(vertical, newProps) >= nbAlignWin ||
		nbCaseSimilaireByDirection(diagTopLeft, newProps) >= nbAlignWin ||
		nbCaseSimilaireByDirection(diagTopRight, newProps) >= nbAlignWin
	)
}

/**
 * Given the board, the index of the last move and the line to check
 * Returns the number of adjacent cases with the same value
 */
function nbCaseSimilaireByDirection(
	dir: LineDirection,
	props: GameState & { player: PLAYER }
): number {
	const { i, j, board, player } = props
	return checkSens(dir.sens1) + checkSens(dir.sens2) + 1

	function checkSens(sens: number[]): number {
		let ret = 0
		let newI = i + sens[0]
		let newJ = j + sens[1]
		while (board[newI]?.[newJ] === player) {
			ret++
			newI = newI + sens[0]
			newJ = newJ + sens[1]
		}
		return ret
	}
}
