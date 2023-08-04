import React, { useEffect, useContext } from "react";
import { GameContext } from "../../context/Blackjack/GameContext";
import { PlayerContext } from "../../context/shared/PlayerContext";
import { ShoeContext } from "../../context/Blackjack/ShoeContext";

import { STATE } from '../../constants/game'
import { TYPES } from '../../constants/users'

import { getBlackjackHandPoints } from "../../utils/handUtils";

import GameSetup from "../../components/blackjack/gamesetup/GameSetup"
import Game from "../../components/blackjack/Game"

function BlackjackPage() {
	const { gameState, setGameState, playerTurn, setPlayerTurn } = useContext(GameContext);
	const { players, setPlayers } = useContext(PlayerContext);
	const { shoe, setShoe } = useContext(ShoeContext);

  	useEffect(() => {
		if(gameState === STATE.PRE_DEAL) {

			if (0.5 > ((Math.round((shoe.length/52) * 100) / 100))) {
				console.log("Not enough cards in the deck to deal for all hands!");
				setGameState(prevGameState => STATE.END_SHOE)
				return;
			}

			const updatedPlayers = {...players};
			const playerArray = Object.values(updatedPlayers);
			const newShoe = [...shoe];

			for(let i = 0; i < 2; i++) {
				for(const player of playerArray) {
					const hand = player.hand;
					if(hand.length < 2) {
						const drawnCard = newShoe.shift();
						if(player.type === TYPES.DEALER && i === 0) {
							drawnCard.faceDown = true;
						}
						hand.push(drawnCard);
						player.handValue = getBlackjackHandPoints(hand);
						updatedPlayers[player._id] = player;
					}
				}
			}
			setPlayers(prevPlayers =>  updatedPlayers );
			setShoe(prevShoe => newShoe);
			setGameState(prevGameState => STATE.PLAYER_TURN);
			setPlayerTurn(prevPlayerTurn => Object.keys(updatedPlayers)[0])
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
