import React, { useEffect, useContext } from "react";
import { GameContext } from "../../context/Blackjack/GameContext";
import { PlayerContext } from "../../context/shared/PlayerContext";
import { ShoeContext } from "../../context/Blackjack/ShoeContext";

import { STATE } from '../../constants/game';
import { TYPES } from '../../constants/users';

import { getBlackjackHandPoints } from "../../utils/handUtils";

import GameSetup from "../../components/blackjack/gamesetup/GameSetup";
import Game from "../../components/blackjack/Game";

function BlackjackPage() {
	const { gameState, setGameState, setTurn } = useContext(GameContext);
	const { players, setPlayers } = useContext(PlayerContext);
	const { shoe, setShoe } = useContext(ShoeContext);

  	useEffect(() => {
		if(gameState === STATE.PRE_DEAL) {

			if (0.5 > ((Math.round((shoe.length/52) * 100) / 100))) {
				console.log("Not enough cards in the deck to deal for all hands!");
				console.log("shoe: " + shoe);
				setGameState(STATE.END_SHOE);
				return;
			}

			const updatedPlayers = {...players};
			const playerArray = Object.values(updatedPlayers);
			const newShoe = [...shoe];

			//player will have an array of hands in case they need to split
			//this way, they can play multiple hands (up to 4)
			//EX: [[3H, 7S], [3C, 8H], ...]
			for(let i = 0; i < 2; i++) {
				for(const player of playerArray) {
					const hand = player.hand;
					if(hand.length < 2) {
						const drawnCard = newShoe.shift();
						if(player.type === TYPES.DEALER && i === 0) {
							drawnCard.faceDown = true;
						}
						if(hand.length === 0) {
							hand.push([drawnCard]);
						} else {
							hand[0].push(drawnCard);
						}
						player.handValue = getBlackjackHandPoints(hand[0], false);
						updatedPlayers[player._id] = player;
					}
				}
			}

			setPlayers(updatedPlayers);
			setShoe(newShoe);
			setGameState(STATE.PLAYER_TURN);
			setTurn(`${Object.values(updatedPlayers)[1]._id}_${0}`);
		}
	}, [gameState]);

	return (
		<>
			{ gameState }
			{ gameState === STATE.START_PAGE ? <GameSetup /> : <Game />}
		</>
	);
}
export default BlackjackPage;
