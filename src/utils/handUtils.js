function drawHand(deck, drawFromDeck) {
	const newCards = [];

	for (let i = 0; i < 7; i++) {
		const drawnCard = drawFromDeck(deck);
		newCards.push(drawnCard);
	}

	return newCards;
}

/*
  Can we measure how good a hand is?
  - Amount of wilds
  - Total value of cards
  - How many potential three-of-a-kinds, straight-flushes (including burn card)
  - Win probability(%)?
*/
function getHandRating(hand) {
	// TODO
}

export { drawHand, getHandRating };
