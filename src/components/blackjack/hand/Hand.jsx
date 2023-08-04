import { React, useEffect, useState, useContext } from 'react';
import Card from "../../common/Card";
import { GameContext } from "../../../context/Blackjack/GameContext";
import { PlayerContext } from "../../../context/shared/PlayerContext"
import { ShoeContext } from "../../../context/Blackjack/ShoeContext";

import { STATE } from '../../../constants/game'
import { TYPES } from '../../../constants/users';

import { getBlackjackHandPoints } from "../../../utils/handUtils";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


function Hand({player, index}) {

	const { 
		gameState, setGameState, 
		playerTurn, setPlayerTurn, 
		alreadyHit, setAlreadyHit 
	} = useContext(GameContext);
	
	const { players, setPlayers } = useContext(PlayerContext);
	const { shoe, setShoe } = useContext(ShoeContext);

	var givePlayerOptions = (playerTurn === player._id && player.name !== TYPES.DEALER && getBlackjackHandPoints(player.hand) !== 21)
	var handValue = getBlackjackHandPoints(player.hand)

	const hit = (e) => {
    	e.preventDefault();
		const playerArray = Object.values(players);
		if(index !== playerArray.length & player.name !== TYPES.DEALER) {
			setAlreadyHit(true);
			
			const updatedPlayer = givePlayerACard();
			setPlayers((prevPlayers) => ({ ...prevPlayers, [updatedPlayer._id]: updatedPlayer }));

			if(updatedPlayer.handValue >= 21) {
				setAlreadyHit(false);
				const newIndex = index+1 < playerArray.length ? index+1 : 0;
				setPlayerTurn(prevPlayerTurn => playerArray[newIndex]._id);
			}
		} else {
			setPlayerTurn(prevPlayerTurn => playerArray[0]._id);
		}
  	}

	  const stay = (e) => {
    	e.preventDefault();
		const playerArray = Object.values(players);
		if(index !== playerArray.length & player.name !== TYPES.DEALER) {
			setAlreadyHit(false);
			const newIndex = index+1 < playerArray.length ? index+1 : 0;
			setPlayerTurn(prevPlayerTurn => playerArray[newIndex]._id);
		} else {
			setPlayerTurn(prevPlayerTurn => playerArray[0]._id);
		}
  	}

	  const doubleDown = (e) => {
    	e.preventDefault();
		
		const playerArray = Object.values(players);
		if(index !== playerArray.length & player.name !== TYPES.DEALER) {
			const updatedPlayer = givePlayerACard();
			setPlayers((prevPlayers) => ({ ...prevPlayers, [updatedPlayer._id]: updatedPlayer }));

			const newIndex = index+1 < playerArray.length ? index+1 : 0;
			setPlayerTurn(prevPlayerTurn => playerArray[newIndex]._id);
		} else {
			setPlayerTurn(prevPlayerTurn => playerArray[0]._id);
		}
  	}

	useEffect(() => {
		const playerArray = Object.values(players)
		if(playerTurn === playerArray[0]._id && player.name === TYPES.DEALER && gameState !== STATE.END_ROUND) {
			//dealer's turn :)
			const updatedDealer = player;
			var dealerHand = updatedDealer.hand;
			for(let i = 0; i < dealerHand.length; i++) {
				const card = dealerHand[i];
				if(card.faceDown) {
					card.faceDown = false;
					dealerHand[i] = card;
				}
			}

			var dealerHandValue = getBlackjackHandPoints(dealerHand);

			while(dealerHandValue < 17) {
				const updatedPlayer = givePlayerACard();
				dealerHand = updatedPlayer.hand;
				dealerHandValue = getBlackjackHandPoints(dealerHand);
			}

			updatedDealer.hand = dealerHand;
			updatedDealer.handValue = dealerHandValue;

			setPlayers((prevPlayers) => ({ ...prevPlayers, [updatedDealer._id]: updatedDealer }));
			setGameState(prevGameState => STATE.END_ROUND);
		} else {
			//check if player has blackjack
			if(getBlackjackHandPoints(player.hand) === 21 && playerTurn === player._id) {
				//setAlreadyHit(false);
				const newIndex = index+1 < playerArray.length ? index+1 : 0;
				setPlayerTurn(prevPlayerTurn => playerArray[newIndex]._id);
			}
		}
	}, [playerTurn]);

	function givePlayerACard() {
		const updatedPlayer = player;
		const newShoe = [...shoe];
		const hand = updatedPlayer.hand;

		hand.push(newShoe.shift());
		updatedPlayer.handValue = getBlackjackHandPoints(hand);

		setShoe(prevShoe => newShoe);

		return updatedPlayer;
	}

	return (
		<>
			<Row><Col> {player.name} </Col></Row>
			<Row>

				{player.hand?.map((card, index) => (
					<Col key={`${card.suit}_${card.value}_${index}_col`}>
						<Card key={`${card.suit}_${card.value}_${index}_card`} data={card} />
					</Col>
				))}
			</Row>
			<Row>
				<Col>Value: {(handValue === 21 && player.hand.length === 2) ? "Blackjack!" : handValue}</Col>
			</Row>
			<Row style={{display: givePlayerOptions ? undefined : 'none'}}>
					<Col>
						<Button variant="primary" onClick={hit}>Hit</Button>
					</Col>
					<Col>
						<Button variant="success" onClick={stay}>Stay</Button>
					</Col>
					<Col>
						<Button variant="warning" onClick={doubleDown} style={{display: alreadyHit ? 'none' : undefined}}>Double Down</Button>
					</Col>
			</Row>
		</>
	);
}

export default Hand;