import PLAYER from './Player'

//Returns the next value of an Enum based on the declaration order
export default function getNext(player: PLAYER): PLAYER {
	const enumSize = Object.keys(PLAYER).length
	const currentIndex = Object.keys(PLAYER).indexOf(player)
	const nextIndex = currentIndex + 1 > enumSize - 1 ? 0 : currentIndex + 1
	return Object.values(PLAYER)[nextIndex]
}
