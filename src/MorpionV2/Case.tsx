import React from 'react'
import PLAYER from './Player'

interface CaseProps {
	value: PLAYER | null
	onClick: () => void
}

export default function Case({ value, onClick }: CaseProps) {
	return (
		<button className='square' onClick={() => onClick()}>
			{value ? PLAYER[value!] : ''}
		</button>
	)
}
