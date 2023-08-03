import { createContext, useContext } from "react";
import { GameContext } from "./GameContext";
import { initializeDeck, shuffleDeck, drawFromDeck, drawFromBurnDeck, resetDecks } from "../../utils/deckUtils";

export const DeckContext = createContext({});

function DeckProvider({ children }) {
	const { currentWild } = useContext(GameContext);

	const deck = initializeDeck(currentWild);
	const burnDeck = [];

	const contextValue = {
		deck: deck,
		burnDeck: burnDeck,
		shuffleDeck: () => shuffleDeck(deck),
		resetDecks: () => resetDecks(currentWild),
		drawFromDeck: () => drawFromDeck(deck),
		drawFromBurnDeck: () => drawFromBurnDeck(burnDeck),
	};

	return <DeckContext.Provider value={contextValue}>{children}</DeckContext.Provider>;
}

export default DeckProvider;
