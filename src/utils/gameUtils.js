const rounds = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function getNextPlayerId(players, currentPlayerId) {
	const playerIdsArr = Object.keys(players);
	const currentIndex = playerIdsArr.indexOf(currentPlayerId);
	const nextIndex = (currentIndex + 1) % playerIdsArr.length;
	return playerIdsArr[nextIndex];
}

export { rounds, getNextPlayerId };
