import React, { useState } from 'react'
import Tableau from './Tableau'
import PLAYER from './Player'
import switchPlayer from './PlayerHelper'
import Historique from './Historique'
import detectWin from './DectectWin'

export interface Histo {
	board: (PLAYER | null)[][]
	player: PLAYER
}

export default function MV2() {
	const nbLignes = 6
	const nbCol = 6
	const nbAlignWin = 3
	const [currentPlayer, setCurrentPlayer] = useState(PLAYER.X)
	const [histo, setHisto] = useState<Histo[]>([
		{
			board: Array(nbLignes).fill(Array(nbCol).fill(null)),
			player: currentPlayer,
		},
	])
	const [cases, setCases] = useState<(PLAYER | null)[][]>(
		Array(nbLignes).fill(Array(nbCol).fill(null))
	)
	const [moveNb, setMoveNb] = useState(0)
	const [winner, setWinner] = useState<PLAYER | null>(null)

	function onClickHisto(i: number) {
		setCases(histo[i].board)
		setCurrentPlayer(histo[i].player)
		setMoveNb(i)
	}

	function onClickCase(i: number, j: number) {
		if (cases[i][j] === null && winner === null) {
			// let newCases = cases.slice() //For immutability, warning doesn't work for multi-dimensional array
			let newCases: (PLAYER | null)[][] = Array(cases.length).fill(null)
			for (let k = 0; k < cases.length; k++) {
				newCases[k] = cases[k].slice()
			}
			newCases[i][j] = currentPlayer
			setCases(newCases)
			if (detectWin({ board: newCases, i, j, nbAlignWin })) {
				setWinner(currentPlayer)
			}
			const nextPlayer: PLAYER = switchPlayer(currentPlayer)
			setCurrentPlayer(nextPlayer)
			const newHisto = [
				...histo.slice(0, moveNb + 1),
				{ board: newCases, player: nextPlayer },
			]
			setHisto(newHisto)
			setMoveNb(moveNb + 1)
		}
	}

	const Status = () => {
		let status: string = winner ? 'Victoire de ' : 'Tour de '
		let ply: string = winner ? winner : currentPlayer
		return (
			<>
				{status} <b>{ply}</b>
			</>
		)
	}

	return (
		<>
			<Status />
			<Tableau
				nbCol={nbCol}
				nbLignes={nbLignes}
				value={cases}
				onClick={onClickCase}
			/>
			<Historique lignes={histo} onClick={onClickHisto} />
		</>
	)
}
