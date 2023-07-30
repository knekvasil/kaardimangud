import { createContext, useContext, useState } from "react";
import { GameContext } from "./GameContext";

export const DeckContext = createContext({});

function DeckProvider({ children }) {
	const { currentWild } = useContext(GameContext);

	const [deck, setDeck] = useState(() => initializeDeck(currentWild));
	const [burnDeck, setBurnDeck] = useState([]);

	function shuffle() {
		const shuffledDeck = [...deck];
		// Fisher-Yates shuffle
		for (let i = shuffledDeck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
		}
		// Update state with shuffled deck
		setDeck(shuffledDeck);
	}

	function drawFromDeck() {
		if (deck.length === 0) {
			console.log("Deck is empty!");
			return null; // Or some other indicator that the deck is empty
		}

		const randomIndex = Math.floor(Math.random() * deck.length);
		const drawnCard = deck[randomIndex];

		// Remove the drawn card from the deck
		const updatedDeck = deck.filter((card, index) => index !== randomIndex);
		setDeck(updatedDeck); // Assuming you have a setDeck function in your DeckContext

		return drawnCard;
	}

	function drawFromBurnDeck() {
		if (burnDeck.length === 0) {
			console.log("Burn Deck is empty!");
			return null;
		}
		const drawnCard = burnDeck[0];
		// Remove card from deck
		const updatedDeck = deck.slice(1);
		// Update burn deck state
		setBurnDeck(updatedDeck);

		return drawnCard;
	}

	function resetDecks() {
		const newDeck = initializeDeck(currentWild);
		// Refill deck
		setDeck(newDeck);
		// Reset burn deck back to empty
		setBurnDeck([]);
	}

	return (
		<DeckContext.Provider value={{ deck, setDeck, shuffle, drawFromDeck, drawFromBurnDeck, resetDecks }}>
			{children}
		</DeckContext.Provider>
	);
}

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
				CORRECT: value,
			};

			deck.push(card);
		}
	}
	return deck;
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

export default DeckProvider;
