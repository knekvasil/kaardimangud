import { createContext, useContext, useState } from "react";
import { DeckContext } from "../shared/DeckContext";

export const ShoeContext = createContext({});

function ShoeProvider({ children }) {
	const { deck } = useContext(DeckContext)
	const [shoe, setShoe] = useState(() => initializeShoe(6, deck));
	const [burnShoe, setBurnShoe] = useState([]);

	function shuffleShoe() {
		//shuffle more times to ensure randomness from sorted decks
		for(let i = 0; i < 100; i++) {
			const shuffledShoe= [...shoe];
			// Fisher-Yates shuffle
			for (let i = shuffledShoe.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffledShoe[i], shuffledShoe[j]] = [shuffledShoe[j], shuffledShoe[i]];
			}
			// Update state with shuffled shoe
			setShoe(shuffledShoe);
		}
	}

	function drawFromShoe() {
		if (shoe.length === 0) {
			console.log("Shoe is empty!");
			return null;
		}
		const drawnCard = shoe[0];
		// Remove card from shoe
		const updatedShoe = shoe.slice(1);
		// Update shoe state
		setShoe(updatedShoe);

		return drawnCard;
	}

	function resetShoe() {
		const newShoe = initializeShoe();
		// Refill shoe
		setShoe(newShoe);
		// Reset burn shoe back to empty
		setBurnShoe([]);
	}

	return (
		<ShoeContext.Provider value={{ shoe, setShoe , burnShoe, setBurnShoe, drawFromShoe, resetShoe, shuffleShoe }}>
			{children}
		</ShoeContext.Provider>
	);
}

function initializeShoe(numberOfDecks, deck) {
	const shoe = [];
	for(let i = 0; i < numberOfDecks; i++) {
		for(const card of deck) {
			if(isNaN(card.value) && !Number.isInteger(card.value)) {
				card.points = getPoints(card.value)
			}
			shoe.push(card);
		}
	}	

	return shoe;
}

function getPoints(value) {
	const isFaceCard = ["J", "Q", "K"].includes(value);
	if (isFaceCard) {
		return 10;
	} else if(value == "A") {
		return [1, 11]
	} else {
		return parseInt(value);
	}
}

export default ShoeProvider;
