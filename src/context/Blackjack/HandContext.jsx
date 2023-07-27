import { createContext, useContext } from "react";
import { ShoeContext } from "ShoeContext";
import { PlayerContext } from "./PlayerContext";

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

		for(let i = 0; i < 2; i++) {
			//deal out 2 cards; one at a time
			for (const player of players) {
				player.hand.push(drawFromShoe())
				player.handValue = getHandValue(player.hand);
			}
			setPlayers([...players]);
		}
	}

	function getHandValue(hand) {
		let count, aceCount = 0;
		let containsAce = false;
		for(const card of hand) {
			//the only card that has multiple values is an ace
			if(card.points.length > 1) {
				aceCount++;
				containsAce = true;
			} else {
				count += card.points;
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
