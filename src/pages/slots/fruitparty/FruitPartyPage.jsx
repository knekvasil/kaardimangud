import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function FruitPartyPage() {
    
    return(
        <>
        <Container>
			<Row><Col className="text-center">Fruit Party</Col></Row>
			<Row>
				<Col className="text-center">
					<h1>This is Fruit Party</h1>
				</Col>
			</Row>
		</Container>
        </>
    )
}

export default FruitPartyPage;