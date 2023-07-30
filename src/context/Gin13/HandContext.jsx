import { createContext, useContext } from "react";
import { PlayerContext } from "../shared/PlayerContext";
import { DeckContext } from "./DeckContext";
import { GameContext } from "./GameContext";

export const HandContext = createContext({});

function HandProvider({ children }) {
	const { deck, drawFromDeck } = useContext(DeckContext);
	const { players, setPlayers } = useContext(PlayerContext);
	const { currentWild } = useContext(GameContext);

	/* 
    Prior to calling this function, verify:
    - Deck has been reset/shuffled
    - Players have been added
  */
	function drawHands() {
		const playerArray = Object.values(players);
		const updatedPlayers = {};

		for (const player of playerArray) {
			const newCards = [];

			for (let i = 0; i < 7; i++) {
				const drawnCard = drawFromDeck();
				newCards.push(drawnCard);
			}

			const updatedPlayer = {
				...player,
				hand: newCards,
				handValue: getHandValue(newCards),
			};

			updatedPlayers[player._id] = updatedPlayer;
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

	/*
    Can we measure how good a hand is?
    - Amount of wilds
    - Total value of cards
    - How many potential three-of-a-kinds, straight-flushes (including burn card)
    - Win probability(%)?
  */
	function getHandRating(hand) {}

	return <HandContext.Provider value={{ drawHands, getHandValue }}>{children}</HandContext.Provider>;
}

export default HandProvider;
