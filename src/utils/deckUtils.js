// Import currentWild

function initializeDeck(currentWild) {
	const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
	const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

	const deck = [];

	for (const suit of suits) {
		const pngSuit = suit.toLowerCase();
		for (const value of values) {
			const pngValue = !isNaN(value) && Number.isInteger(value) ? value : value.toLowerCase();

			const png = `/assets/cards/fronts/${pngSuit.toLowerCase()}_${pngValue}.png`;
			const points = getPoints(value, currentWild);

			const card = {
				suit: suit,
				value: value,
				points: points,
				png: png,
			};

			deck.push(card);
		}
	}

	const shuffledDeck = shuffleDeck(deck);

	return shuffledDeck;
}

function shuffleDeck(deck) {
	// Fisher-Yates shuffle
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	return deck;
}

function resetDecks(currentWild) {
	const newDeck = initializeDeck(currentWild);
	const newBurnDeck = [];

	return { deck: newDeck, burnDeck: newBurnDeck };
}

function drawFromDeck(deck) {
	if (deck.length === 0) {
		console.log("Deck is empty!");
		// TODO: shuffle burn deck + set to deck deck
		return null;
	}
	// Pop the top card from the deck
	const drawnCard = deck.pop();

	return drawnCard;
}

function drawFromBurnDeck(burnDeck) {
	if (burnDeck.length === 0) {
		console.log("Deck is empty!");
		// TODO: shuffle burn deck + set to deck deck
		return null;
	}
	// Pop the top card from the deck
	const drawnCard = burnDeck.pop();

	return drawnCard;
}

function getPoints(value, currentWild) {
	const isFaceCard = ["J", "Q", "K", "A"].includes(value);
	if (value === currentWild) {
		return 25;
	}

	if (isFaceCard) {
		return 10;
	} else {
		return parseInt(value);
	}
}

export { initializeDeck, shuffleDeck, resetDecks, drawFromDeck, drawFromBurnDeck };
