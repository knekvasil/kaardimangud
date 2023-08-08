import { React, useEffect, useState, useContext } from 'react';
import Card from "../../common/Card";
import { GameContext } from "../../../context/Blackjack/GameContext";
import { PlayerContext } from "../../../context/shared/PlayerContext";
import { ShoeContext } from "../../../context/Blackjack/ShoeContext";

import { STATE } from '../../../constants/game';
import { TYPES } from '../../../constants/users';
import { RESULTS } from '../../../constants/results';

import { getBlackjackHandPoints } from "../../../utils/handUtils";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

//todo: determine who's turn it is
function Hand({player, hand, playerIndex, handIndex}) {

	const { 
		gameState, setGameState, 
		turn, setTurn, 
		alreadyHit, setAlreadyHit,
		activePlayers, setActivePlayers
	} = useContext(GameContext);
	
	const { players, setPlayers } = useContext(PlayerContext);
	const { shoe, setShoe } = useContext(ShoeContext);

	var handValue = getBlackjackHandPoints(hand, false);
	var giveHandOptions = (turn === `${player._id}_${handIndex}`
							&& player.name !== TYPES.DEALER 
							&& handValue !== 21
							&& gameState !== STATE.END_ROUND);

	const hit = (e) => {
    	e.preventDefault();
		const playerArray = Object.values(players);
		if(playerIndex !== playerArray.length & player.name !== TYPES.DEALER) {
			setAlreadyHit(true);
			
			const updatedHand = giveHandACard();
			const updatedPlayer = player;
			updatedPlayer.hand[handIndex] = updatedHand;
			setPlayers((prevPlayers) => ({ ...prevPlayers, [updatedPlayer._id]: updatedPlayer }));

			let updatedHandValue = getBlackjackHandPoints(updatedHand, true);
			if(updatedHandValue >= 21) {
				if(updatedHandValue === 21 && !activePlayers.includes(updatedPlayer._id)) {
					setActivePlayers(prevActivePlayers => ([...prevActivePlayers, updatedPlayer._id]))
				}
				//this hand has busted or has 21
				setAlreadyHit(false);
				let newHandIndex = handIndex+1 >= player.hand.length ? 0 : handIndex+1
				setTurn(`${playerArray[newPlayerIndex(playerArray)]._id}_${newHandIndex}`);
			}
		} else {
			setTurn(`${playerArray[0]._id}_0`);
		}
  	}

	  const stay = (e) => {
    	e.preventDefault();
		const playerArray = Object.values(players);
		if(playerIndex !== playerArray.length & player.name !== TYPES.DEALER) {
			setAlreadyHit(false);
			setActivePlayers(prevActivePlayers => ([...prevActivePlayers, player._id]))

			let newHandIndex = handIndex+1 >= player.hand.length ? 0 : handIndex+1
			setTurn(`${playerArray[newPlayerIndex(playerArray)]._id}_${newHandIndex}`);
		} else {
			setTurn(`${playerArray[0]._id}_0`);
		}
  	}

	  const doubleDown = (e) => {
    	e.preventDefault();
		
		const playerArray = Object.values(players);
		if(playerIndex !== playerArray.length & player.name !== TYPES.DEALER) {
			const updatedHand = giveHandACard();
			const updatedPlayer = player;
			updatedPlayer.hand[handIndex] = updatedHand;

			if(getBlackjackHandPoints(updatedHand, true) <= 21 && !activePlayers.includes(updatedPlayer._id)) {
				setActivePlayers(prevActivePlayers => ([...prevActivePlayers, updatedPlayer._id]))
			}
			setPlayers((prevPlayers) => ({ ...prevPlayers, [updatedPlayer._id]: updatedPlayer }));

			let newHandIndex = handIndex+1 >= player.hand.length ? 0 : handIndex+1
			setTurn(`${playerArray[newPlayerIndex(playerArray)]._id}_${newHandIndex}`);
		} else {
			setTurn(`${playerArray[0]._id}_0`);
		}
  	}

	const split = (e) => {
		e.preventDefault();

		const playerArray = Object.values(players);
		if(playerIndex !== playerArray.length & player.name !== TYPES.DEALER) {
			var updatedHand = hand;
			const newShoe = [...shoe];

			const secondHand = [updatedHand.pop()];

			updatedHand.push(newShoe.shift());

			const updatedPlayer = player;
			updatedPlayer.hand[handIndex] = updatedHand;
			updatedPlayer.hand.push(secondHand);

			setShoe(newShoe);
			setPlayers((prevPlayers) => ({ ...prevPlayers, [updatedPlayer._id]: updatedPlayer }));

			//have to set player turn when the first card given to their first hand is 21
			if((getBlackjackHandPoints(updatedHand, true) === 21 || updatedHand[0].points.length > 1) && turn === `${player._id}_${handIndex}`){
				//let newHandIndex = handIndex+1 >= updatedHand.length ? 0 : handIndex+1
				setTurn(`${playerArray[playerIndex]._id}_${handIndex+1}`);
			}
		} else {
			setTurn(`${playerArray[0]._id}_0`);
		}

	}

	useEffect(() => {
		const playerArray = Object.values(players)
		if(turn === `${playerArray[0]._id}_0` && player.name === TYPES.DEALER && gameState !== STATE.END_ROUND) {
			//dealer's turn :)
			const updatedDealer = player;
			var dealerHand = updatedDealer.hand[0];
			for(let i = 0; i < dealerHand.length; i++) {
				const card = dealerHand[i];
				if(card.faceDown) {
					card.faceDown = false;
					dealerHand[i] = card;
				}
			}

			var dealerHandValue = getBlackjackHandPoints(dealerHand, true);

			//keep drawing until handValue >= 17
			//if there are no active players, don't draw any more cards
			const newShoe = [...shoe];
			while(dealerHandValue < 17 && activePlayers.length !== 0) {
				dealerHand.push(newShoe.shift());
				dealerHandValue = getBlackjackHandPoints(dealerHand, true);
			}

			updatedDealer.hand[0] = dealerHand;
			updatedDealer.handValue = dealerHandValue;

			setShoe(newShoe);
			setPlayers((prevPlayers) => ({ ...prevPlayers, [updatedDealer._id]: updatedDealer }));
			setGameState(STATE.END_ROUND);
		} else {
			if(getBlackjackHandPoints(hand, true) === 21) {
				//check if player has blackjack
				if(turn === `${player._id}_${handIndex}`){
					//let newHandIndex = handIndex+1 >= player.hand.length ? 0 : handIndex+1
					setTurn(`${playerArray[newPlayerIndex(playerArray)]._id}_${0}`);
				} else {
					//check if dealer has blackjack
					if(player.name === TYPES.DEALER) {
						const updatedDealer = player;
						var dealerHand = updatedDealer.hand[0];
						for(let i = 0; i < dealerHand.length; i++) {
							const card = dealerHand[i];
							if(card.faceDown) {
								card.faceDown = false;
								dealerHand[i] = card;
							}
						}

						updatedDealer.hand[0] = dealerHand;	
						updatedDealer.handValue = dealerHandValue;

						setPlayers((prevPlayers) => ({ ...prevPlayers, [updatedDealer._id]: updatedDealer }));
						setGameState(STATE.END_ROUND);
					}
				}
			} else {
				//check if the player only has one card from splitting
				if(turn === `${player._id}_${handIndex}` && player.type === TYPES.PLAYER && gameState === STATE.PLAYER_TURN) {
					if(hand.length === 1) {
						const updatedHand = giveHandACard();
						const firstCard = updatedHand[0];
						const updatedPlayer = player;

						updatedPlayer.hand[handIndex] = updatedHand;
						setPlayers((prevPlayers) => ({ ...prevPlayers, [updatedPlayer._id]: updatedPlayer }));

						if(firstCard.points.length > 1) {
							//the first card is an ace after split
							//skip this hand's turn since they split aces
							let newHandIndex = handIndex+1 >= updatedHand.length ? 0 : handIndex+1
							setTurn(`${playerArray[newPlayerIndex(playerArray)]._id}_${newHandIndex}`);
						} else {
							if(getBlackjackHandPoints(updatedHand, true) === 21 && turn === `${player._id}_${handIndex}`){
								let newHandIndex = handIndex+1 >= updatedPlayer.length ? 0 : handIndex+1
								setTurn(`${playerArray[newPlayerIndex(playerArray)]._id}_${newHandIndex}`);
							}
						}
					}
				}
			}
		}
	}, [turn]);

	function giveHandACard() {
		const updatedHand = hand;
		const newShoe = [...shoe];

		updatedHand.push(newShoe.shift());

		setShoe(newShoe);

		return updatedHand;
	}

	function canSplit() {
		if(hand.length > 2) { return false; }
		var firstCardPoints = 0;
		for(const card of hand) {
			if(firstCardPoints === 0) {
				firstCardPoints = card.points[0];
			} else {
				return firstCardPoints === card.points[0];
			}
		}
		return false;
	}

	function isWinner(dealer) {
		let dealerHandValue = getBlackjackHandPoints(dealer.hand[0], true);
		let handValue = getBlackjackHandPoints(hand, true);
		
		if(player.type === TYPES.PLAYER) {
			if(handValue <= 21) {
				if(dealerHandValue > 21) {
					return RESULTS.WINNER;
				} else {
					if(handValue === dealerHandValue) {
						return RESULTS.PUSH;
					}
					return (handValue > dealerHandValue ? RESULTS.WINNER : RESULTS.LOSER);
				}
			} else {
				return RESULTS.LOSER;
			}
		} 
		return RESULTS.LOSER;
	}

	function newPlayerIndex(playerArray) {
		//first, check if the player has any more hands to go through
		if(handIndex+1 >= player.hand.length) {
			//if we reached the end of the players, set it to the dealer
			return playerIndex+1 < playerArray.length ? playerIndex+1 : 0;
		} else {
			//player still has more hands left to play
			return playerIndex;
		}
		return 0;
	}

	return (
		<>
			<Row><Col> {player.name}_{handIndex} </Col></Row>
			<Row>
				{hand?.map((card, index) => (
					<Col key={`${card._id}_col`}>
						<Card key={`${card._id}_card`} data={card} />
					</Col>
				))}
			</Row>
			<Row>
				<Col>Value: {(getBlackjackHandPoints(hand, true) === 21 
							&& hand.length === 2 
							&& handIndex === 0 
							&& player.hand.length === 1) ? "Blackjack!" : handValue}</Col>
			</Row>
			<Row style={{display: giveHandOptions ? undefined : 'none'}}>
					<Col>
						<Button variant="primary" onClick={hit}>Hit</Button>
					</Col>
					<Col>
						<Button variant="success" onClick={stay}>Stay</Button>
					</Col>
					<Col>
						<Button variant="warning" onClick={doubleDown} style={{display: alreadyHit ? 'none' : undefined}}>Double Down</Button>
					</Col>
					<Col style={{display: canSplit() ? undefined : 'none'}}>
					<Button variant="info" onClick={split}>Split</Button>
					</Col>
			</Row>
			<Row>
				<Col style={{display: player.type === TYPES.DEALER ? 'none' : undefined}}>
					Result: {(gameState === STATE.END_ROUND || handValue > 21) ? isWinner(Object.values(players)[0]) : ''}
				</Col>
			</Row>
			
		</>
	);
}

export default Hand;