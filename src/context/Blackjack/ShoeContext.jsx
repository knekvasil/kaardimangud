import { createContext, useState } from "react";

export const ShoeContext = createContext({});

function ShoeProvider({ children }) {
	const [shoe, setShoe] = useState(() => initializeShoe(6));
	const [burnShoe, setBurnShoe] = useState([]);

	return (
		<ShoeContext.Provider value={{ shoe, setShoe, burnShoe, setBurnShoe }}>
			{children}
		</ShoeContext.Provider>
	);
}

function shuffleShoe(initialShoe) {
	const shuffledShoe = initialShoe;
	//shuffle more times to ensure randomness from sorted shoe
	for (let i = 0; i < 10; i++) {
		// Fisher-Yates shuffle
		for (let i = shuffledShoe.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffledShoe[i], shuffledShoe[j]] = [shuffledShoe[j], shuffledShoe[i]];
		}
		return shuffledShoe;
	}
}

function initializeShoe(numberOfDecks) {
	const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
	const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

	const shoe = [];
 	
 	for(let i = 0; i < numberOfDecks; i++) {
		for (const suit of suits) {
			const pngSuit = suit.toLowerCase();
			for (const value of values) {
				const pngValue = !isNaN(value) && Number.isInteger(value) ? value : value.toLowerCase();

				const png = `/assets/cards/fronts/${pngSuit.toLowerCase()}_${pngValue}.png`;
				const points = getPoints(value);

				const card = {
					suit: suit,
					value: value,
					points: points,
					png: png,
					faceDown: false,
					backPng: '/assets/cards/backs/red.png'
				};

				shoe.push(card);
			}
		}
	}
	return shuffleShoe(shoe);
}

function getPoints(value) {
	const isFaceCard = ["J", "Q", "K"].includes(value);
	if (isFaceCard) {
		return [10];
	} else if (value === "A") {
		return [1, 11];
	} else {
		return [parseInt(value)];
	}
}

export default ShoeProvider;
