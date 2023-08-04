import { createContext, useContext } from "react";
import { ShoeContext } from "./ShoeContext";
import { PlayerContext } from "../shared/PlayerContext";

export const HandContext = createContext({});

function HandProvider({ children }) {
	const { shoe, drawFromShoe } = useContext(ShoeContext);
	const { players, setPlayers } = useContext(PlayerContext);

	/* 
    Prior to calling this function, verify:
    - Shoe has been reset/shuffled
    - Players have been added
    */
	function drawHands() {
		// check to see if we have at least 1/2 a deck left
		if (0.5 > ((Math.round((shoe.length/52) * 100) / 100))) {
			console.log("Not enough cards in the deck to deal for all hands!");
			return;
		}

		const playerArray = Object.values(players);
		const updatedPlayers = {};

		for(let i = 0; i < 2; i++) {
			for (const player of playerArray) {

				const playerHand = player.hand
				const drawnCard = drawFromShoe();
				playerHand.push(drawnCard);

				const updatedPlayer = {
					...player,
					hand: playerHand,
					handValue: getHandValue(playerHand),
				};

				updatedPlayers[player._id] = updatedPlayer;
			}
			// Update player state
			setPlayers((prevPlayers) => ({
				...prevPlayers,
				...updatedPlayers,
			}));
		}
	}

	function getHandValue(hand) {
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
    - Win probability(%)?
    */
	function getHandRating(hand) {}

	return <HandContext.Provider value={{ drawHands, getHandValue }}>{children}</HandContext.Provider>;
}

export default HandProvider;
