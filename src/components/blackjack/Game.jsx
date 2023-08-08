import { React, useContext } from 'react';
import { GameContext } from "../../context/Blackjack/GameContext";
import { ShoeContext } from "../../context/Blackjack/ShoeContext";
import { PlayerContext } from "../../context/shared/PlayerContext";

import { STATE } from '../../constants/game';

import Seat from './Seat';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Game() {

    const { 
        gameState, setGameState, turn,
        setActivePlayers
    } = useContext(GameContext);
    const { players, setPlayers } = useContext(PlayerContext);
    const { shoe, setShoe, initializeShoe } = useContext(ShoeContext);

    const newDeal = (e) => {
        e.preventDefault();

        const updatedPlayers = {...players}
        const playerArray = Object.values(players)

        for(const player of playerArray) {
            player.hand = [];
            player.handValue = 0;
            updatedPlayers[player._id] = player;
        }

        setActivePlayers([]);
        setPlayers(updatedPlayers);
        setGameState(STATE.PRE_DEAL);
    }

    const restartGame = (e) => {
        e.preventDefault();

        const updatedPlayers = {...players}
        const playerArray = Object.values(players)

        for(const player of playerArray) {
            player.hand = [];
            player.handValue = 0;
            updatedPlayers[player._id] = player;
        }

        setActivePlayers([]);
        setPlayers(updatedPlayers);

        const newShoe = initializeShoe(6);
        setShoe(newShoe);

        setGameState(STATE.PRE_DEAL);
    }

    return(
        <>
            <Row>
                { Object.values(players)?.map((player, playerIndex) => (
                    <Col className="outlineRow" key={`${player._id}_${playerIndex}_col`}>
                        <Seat key={`${player._id}_${playerIndex}_seat`} player={player} playerIndex={playerIndex}/>
                    </Col>
                ))}
            </Row>
            <br />
            <Row className="text-center" style={{display: gameState === STATE.END_ROUND ? undefined : 'none'}}>
                <Col>
                    <Button onClick={newDeal}>New Deal</Button>
                </Col>
            </Row>
            <Row className="text-center" style={{display: gameState === STATE.END_SHOE ? undefined : 'none'}}>
                <Col>
                    <Button onClick={restartGame}>Restart Game</Button>
                </Col>
            </Row>
        </>
    );

}

export default Game;

/*
<Col className="outlineRow" key={`${player._id}_${index}_col`}>
                        <Hand key={`${player._id}_${index}_hand`} player={player} index={index}/>
                    </Col>
*/