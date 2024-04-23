import { React, useContext } from 'react';

import Hand from './hand/Hand';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Seat({player, playerIndex}) {

    return(
        <>
            <Row className="outlineRow"><Col> {player.name} </Col></Row>
            <Row>
                { player.hand?.map((hand, handIndex) => (
                    <Col className="outlineRow" key={`${player._id}_${playerIndex}_${handIndex}_hand_col`}>
                        <Hand 
                            key={`${player._id}_${playerIndex}_${handIndex}_hand`} 
                            player={player} 
                            hand={hand}
                            playerIndex={playerIndex}
                            handIndex={handIndex}
                        />
                    </Col>
                ))}
            </Row>
            <Row className="outlineRow">
                    <Col><intput>Wager</intput></Col>
            </Row>
        </>
    );
}

export default Seat;