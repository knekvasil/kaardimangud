import { createContext, useState } from "react";
import { DeckContext } from "./DeckContext";

export const ShoeContext = createContext({});

function ShoeProvider({ children }) {
	const { deck, drawFromDeck, resetDecks } = useContext(DeckContext);
	const [shoe, setShoe] = useState(() => initializeShoe(6));
	const [burnShoe, setBurnShoe] = useState([]);

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
		<ShoeContext.Provider value={{ shoe, setShoe , burnShoe, setBurnShoe, drawFromShoe, resetShoe }}>
			{children}
		</ShoeContext.Provider>
	);
}

function initializeShoe(numberOfDecks) {
	const shoe = [];
	for(let i = 0; i < numberOfDecks; i++) {
		for(const card of deck) {
			If(isNaN(value) && !Number.isInteger(value)) {
				card.points = getPoints(card.value)
			}
			shoe.push(card);
		}
		resetDecks();
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

export default shoeProvider;
