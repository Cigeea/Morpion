import React from 'react'
import { Histo } from './MV2'

interface HistoriqueProps {
	lignes: Histo[]
	onClick: (i: number) => void
}

export default function Historique({ lignes, onClick }: HistoriqueProps) {
	return (
		<div className='game-info'>
			<ol>
				{lignes.map((ligne, index) => (
					<li key={index}>
						<button onClick={() => onClick(index)}>Go to move {index}</button>
					</li>
				))}
			</ol>
		</div>
	)
}
