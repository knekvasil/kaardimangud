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
		alreadyHit, setAlreadyHit,
		activePlayers, setActivePlayers
	} = useContext(GameContext);
	
	const { players, setPlayers } = useContext(PlayerContext);
	const { shoe, setShoe } = useContext(ShoeContext);

	var givePlayerOptions = (playerTurn === player._id && player.name !== TYPES.DEALER && player.handValue !== 21)
	var playerHandValue = player.handValue

	const hit = (e) => {
    	e.preventDefault();
		const playerArray = Object.values(players);
		if(index !== playerArray.length & player.name !== TYPES.DEALER) {
			setAlreadyHit(true);
			
			const updatedPlayer = givePlayerACard();
			setPlayers((prevPlayers) => ({ ...prevPlayers, [updatedPlayer._id]: updatedPlayer }));

			if(updatedPlayer.handValue >= 21) {
				if(updatedPlayer.handValue === 21) {
					setActivePlayers(prevActivePlayers => ({...activePlayers, updatedPlayer}))
				}
				//this player busted or has 21
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
			setActivePlayers(prevActivePlayers => ({...activePlayers, player}))

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

			//keep drawing until handValue >= 17
			//if there are no active players, don't draw any more cards
			while(dealerHandValue < 17 && activePlayers.length !== 0) {
				const updatedPlayer = givePlayerACard();
				dealerHand = updatedPlayer.hand;
				dealerHandValue = getBlackjackHandPoints(dealerHand);
			}

			//globalDealerHandValue = dealerHandValue
			updatedDealer.hand = dealerHand;
			updatedDealer.handValue = dealerHandValue;

			setPlayers((prevPlayers) => ({ ...prevPlayers, [updatedDealer._id]: updatedDealer }));
			setGameState(prevGameState => STATE.END_ROUND);
		} else {
			//check if player has blackjack

			if(getBlackjackHandPoints(player.hand) === 21 && playerTurn === player._id) {
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

	function isWinner(dealer) {
		let dealerHandValue = dealer.handValue;
		let playerHandValue = player.handValue;
		
		if(player.type === TYPES.PLAYER) {
			//evaluate player
			if(playerHandValue <= 21) {
				if(dealerHandValue > 21) {
					return "Winner"
				} else {
					return (playerHandValue > dealerHandValue ? "Winner" : "Loser");
				}
			} else {
				return "Loser"
			}
		} 
		return "Loser";
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
				<Col>Value: {(playerHandValue === 21 && player.hand.length === 2) ? "Blackjack!" : playerHandValue}</Col>
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
			<Row>
				<Col style={{display: player.type === TYPES.DEALER ? 'none' : undefined}}>
					Result: {gameState === STATE.END_ROUND ? isWinner(Object.values(players)[0]) : ''}
				</Col>
			</Row>
			
		</>
	);
}

export default Hand;