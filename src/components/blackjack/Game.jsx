import { React, useContext } from 'react'
import { GameContext } from "../../context/Blackjack/GameContext";
import { PlayerContext } from "../../context/shared/PlayerContext";
import Hand from './hand/Hand'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Game() {

    const { setGameState, numberOfPlayers, setNumberOfPlayers } = useContext(GameContext);
    const { players, setPlayers, playerTurn, setPlayerTurn } = useContext(PlayerContext);

    return(
        <>
            <Row>
                { Object.values(players)?.map((player, index) => (
                    <Col className="outlineRow" key={`${player._id}_col`}>
                        <Hand key={`${player._id}_hand`} player={player}/>
                    </Col>
                ))}
            </Row>
        </>
    );

}

export default Game;