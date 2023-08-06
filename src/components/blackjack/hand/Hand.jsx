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

	var givePlayerOptions = (playerTurn === player._id 
							&& player.name !== TYPES.DEALER 
							&& player.handValue !== 21
							&& gameState !== STATE.END_ROUND)
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

			if(updatedPlayer.handValue <= 21) {
				setActivePlayers(prevActivePlayers => ({...activePlayers, player}))
			}
			setPlayers((prevPlayers) => ({ ...prevPlayers, [updatedPlayer._id]: updatedPlayer }));

			const newIndex = index+1 < playerArray.length ? index+1 : 0;
			setPlayerTurn(prevPlayerTurn => playerArray[newIndex]._id);
		} else {
			setPlayerTurn(prevPlayerTurn => playerArray[0]._id);
		}
  	}

	const split = (e) => {
		e.preventDefault();
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

			var dealerHandValue = getBlackjackHandPoints(dealerHand, true);

			//keep drawing until handValue >= 17
			//if there are no active players, don't draw any more cards
			const newShoe = [...shoe]
			while(dealerHandValue < 17 && activePlayers.length !== 0) {
				dealerHand.push(newShoe.shift())
				dealerHandValue = getBlackjackHandPoints(dealerHand, true);
			}

			updatedDealer.hand = dealerHand;
			updatedDealer.handValue = dealerHandValue;

			setShoe(prevShoe => newShoe)
			setPlayers((prevPlayers) => ({ ...prevPlayers, [updatedDealer._id]: updatedDealer }));
			setGameState(prevGameState => STATE.END_ROUND);
		} else {
			if(getBlackjackHandPoints(player.hand, true) === 21) {
				//check if player has blackjack
				if(playerTurn === player._id){
					const newIndex = index+1 < playerArray.length ? index+1 : 0;
					setPlayerTurn(prevPlayerTurn => playerArray[newIndex]._id);
				} else {
					//check if dealer has blackjack
					if(player.name === TYPES.DEALER) {
						const updatedDealer = player;
						var dealerHand = updatedDealer.hand;
						for(let i = 0; i < dealerHand.length; i++) {
							const card = dealerHand[i];
							if(card.faceDown) {
								card.faceDown = false;
								dealerHand[i] = card;
							}
						}

						updatedDealer.hand = dealerHand;	
						updatedDealer.handValue = dealerHandValue;

						setPlayers((prevPlayers) => ({ ...prevPlayers, [updatedDealer._id]: updatedDealer }));
						setGameState(prevGameState => STATE.END_ROUND);
					}
				}
			}
		}
	}, [playerTurn]);

	function givePlayerACard() {
		const updatedPlayer = player;
		const newShoe = [...shoe];
		const hand = updatedPlayer.hand;

		hand.push(newShoe.shift());
		updatedPlayer.handValue = getBlackjackHandPoints(hand, true);

		setShoe(prevShoe => newShoe);

		return updatedPlayer;
	}

	function canSplit() {
		if(player.hand.length > 2) { return false; }
		var firstCardPoints = 0;
		for(const card of player.hand) {
			if(firstCardPoints === 0) {
				firstCardPoints = card.points[0];
			} else {
				return firstCardPoints === card.points[0];
			}
		}
		return false;
	}

	function isWinner(dealer) {
		let dealerHandValue = dealer.handValue;
		let playerHandValue = player.handValue;
		
		if(player.type === TYPES.PLAYER) {
			if(playerHandValue <= 21) {
				if(dealerHandValue > 21) {
					return "Winner"
				} else {
					if(playerHandValue === dealerHandValue) {
						return "Push";
					}
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
				<Col>Value: {(getBlackjackHandPoints(player.hand, true) === 21 && player.hand.length === 2) ? "Blackjack!" : playerHandValue}</Col>
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
					<Col style={{display: canSplit() ? undefined : 'none'}}>
					<Button variant="info" onClick={split}>Split</Button>
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