import { React, useEffect, useState, useContext } from 'react'
import Card from "../../common/Card"
import { GameContext } from "../../../context/Blackjack/GameContext"
import { STATE } from '../../../constants/game'
import { TYPES } from '../../../constants/users';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


function Hand({player}) {

	/*const [handValue, setHandValue] = useState(player.handValue)
	const { gameState } = useContext(GameContext)

	useEffect(() => {
		//flip dealer down card over to show
		if(gameState == STATE.DEALER_TURN && player.type == TYPES.DEALER) {
			for(const card of player.cards) {
				if(card.faceDown) { card.faceDown = false }
			}
		}
	}, gameState)

	useEffect(() => {
		//runs every time the value of the player's hand changes
		setHandValue(player.handValue)
		console.log("Player " + player.name + "'s new hand value: " + handValue)
	}, [handValue])*/

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
				<Col>Value: {player.type === TYPES.PLAYER ? player.handValue : getDealerInitialHandValue(player.hand)}</Col>
			</Row>
		</>
	);
}

function getDealerInitialHandValue(hand) {
	let count = 0;
	for(const card of hand) {
		if(!card.faceDown) {
			count += (card.points.length > 1 ? card.points[1] : card.points[0])
		}
	}
	return count;
}

export default Hand;