import { React, useContext } from 'react'
import { GameContext } from "../../context/Blackjack/GameContext";
import { PlayerContext } from "../../context/shared/PlayerContext";

import { STATE } from '../../constants/game'

import Hand from './hand/Hand'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Game() {

    const { 
        gameState, setGameState, 
        numberOfPlayers, setNumberOfPlayers, 
        playerTurn, setPlayerTurn,
        setActivePlayers
    } = useContext(GameContext);
    const { players, setPlayers } = useContext(PlayerContext);

    const newDeal = (e) => {
        e.preventDefault();

        const updatedPlayers = {...players}
        const playerArray = Object.values(players)

        for(const player of playerArray) {
            player.hand = [];
            player.handValue = 0;
            updatedPlayers[player._id] = player;
        }

        setActivePlayers(prevActivePlayers => [])
        setPlayers(prevPlayers => updatedPlayers);
        setGameState(prevGameState => STATE.PRE_DEAL)
    }

    return(
        <>
            <Row>
                { Object.values(players)?.map((player, index) => (
                    <Col className="outlineRow" key={`${player._id}_col`}>
                        <Hand key={`${player._id}_hand`} player={player} index={index}/>
                    </Col>
                ))}
            </Row>
            <br />
            <Row className="text-center" style={{display: gameState === STATE.END_ROUND ? undefined : 'none'}}>
                <Col>
                    <Button onClick={newDeal}>New Deal</Button>
                </Col>
            </Row>
        </>
    );

}

export default Game;