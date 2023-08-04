import { React, useContext } from 'react'
import { GameContext } from "../../../context/Blackjack/GameContext";
import { PlayerContext } from "../../../context/shared/PlayerContext";

import { STATE } from '../../../constants/game'
import { TYPES } from '../../../constants/users'

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function GameSetup() {

    const { setGameState, numberOfPlayers, setNumberOfPlayers } = useContext(GameContext);
    const { players, addPlayer } = useContext(PlayerContext);

    const startGame = (e) => {
    	e.preventDefault();
		if(Object.keys(players).length < numberOfPlayers) {
			addPlayer('Dealer', TYPES.DEALER);
			for(let i = 0; i < numberOfPlayers; i++) {
				addPlayer('Player '+i, TYPES.PLAYER);
			}
		}
        setGameState(prevGameState => STATE.PRE_DEAL);
  	}

    return (
		<>
			<Container className="text-center">
				<Row>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Number of Players</Form.Label>
							<Form.Range value={numberOfPlayers} onChange={e => setNumberOfPlayers(e.target.value)} min={1} max={8}/>
							{numberOfPlayers}
						</Form.Group>
						<Form.Group>
							<Form.Label>Hit on Soft 17</Form.Label>
							<Form.Check type="switch" id="custom-switch" abel="Hit on Soft 17" />
						</Form.Group>
					</Form>
				</Row>
				<br />
				<Row>
					<Col>
						<Button size="lg" onClick={startGame}>Play</Button>
					</Col>
				</Row>
			</Container>
			
		</>
	);
}

export default GameSetup;