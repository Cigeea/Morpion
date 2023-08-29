import React from 'react'
import PLAYER from './Player'
import Case from './Case'

interface TableauProp {
	value: (PLAYER | null)[][]
	nbLignes?: number
	nbCol?: number
	onClick: (i: number, j: number) => void
}

export default function Tableau({
	value,
	onClick,
	nbLignes = 3,
	nbCol = 3,
}: TableauProp) {
	function renderLine(i: number) {
		let elements: React.JSX.Element[] = []
		for (let j = 0; j < nbCol; j++) {
			elements.push(
				<Case
					key={'' + i + j}
					value={value[i][j]}
					onClick={() => onClick(i, j)}
				/>
			)
		}
		return (
			<div key={i} className='board-row'>
				{elements}
			</div>
		)
	}

	let lines: React.JSX.Element[] = []
	for (let i = 0; i < nbLignes; i++) {
		lines.push(renderLine(i))
	}
	return <div className='game-board'>{lines}</div>
}
