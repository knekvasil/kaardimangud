function drawHand(deck, drawFromDeck) {
	const newCards = [];

	for (let i = 0; i < 7; i++) {
		const drawnCard = drawFromDeck(deck);
		newCards.push(drawnCard);
	}

	return newCards;
}

//hand is an array
function getBlackjackHandPoints(hand, excludeFaceDownCard) {
	if(hand.length < 1) { return 0; }
	if(hand.length === 1) { 
		//console.log("hand="+hand);
		//console.log("hand[0="+hand[0]);
		return hand[0].points[0]; }
	let count = 0;
	let aceCount = 0;
	for(const card of hand) {
		//console.log(card)
		if(!card.faceDown || excludeFaceDownCard) {
			if(card.points.length > 1) {
				aceCount++;
			} else {
				count += card.points[0];
			}
		}
	}

	for (let i = aceCount; i > 0; i--) {
		count += ((count + 11) <= 21 && i < 2) ? 11 : 1;
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
