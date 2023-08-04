function drawHand(deck, drawFromDeck) {
	const newCards = [];

	for (let i = 0; i < 7; i++) {
		const drawnCard = drawFromDeck(deck);
		newCards.push(drawnCard);
	}

	return newCards;
}

//hand is an array
function getBlackjackHandPoints(hand) {
	let count = 0;
	let aceCount = 0;
	for(const card of hand) {
		//the only card that has multiple values is an ace
		if(card.points.length > 1) {
			aceCount++;
		} else {
			count += card.points[0];
		}
	}

	for (let i = aceCount; i > 0; i--) {
		if(count + 11 <= 21 && i < 2) {
			count += 11;
		} else { 
			count++;
		}
	}

	return count;
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

export { drawHand, getBlackjackHandPoints, getHandRating };
