import { createContext, useContext } from "react";
import { PlayerContext } from "../shared/PlayerContext";
import { DeckContext } from "./DeckContext";

import { drawHand } from "../../utils/handUtils";

export const HandContext = createContext({});

function HandProvider({ children }) {
	const { deck, drawFromDeck } = useContext(DeckContext);
	const { players, setPlayers } = useContext(PlayerContext); // State

	function drawHands() {
		const playerArray = Object.values(players);
		const updatedPlayers = {};

		const deckCopy = [...deck];

		for (const player of playerArray) {
			const hand = drawHand(deckCopy, drawFromDeck);
			updatedPlayers[player._id] = { ...player, hand: hand, handValue: getHandValue(hand) };
		}

		// Update player state
		setPlayers((prevPlayers) => ({
			...prevPlayers,
			...updatedPlayers,
		}));
	}

	function getHandValue(hand) {
		let sum = 0;
		for (const card of hand) {
			sum += card.points;
		}
		return sum;
	}

	function getHandRating(hand) {}

	return <HandContext.Provider value={{ drawHands, getHandValue }}>{children}</HandContext.Provider>;
}

export default HandProvider;
