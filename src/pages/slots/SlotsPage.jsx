import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function SlotsPage() {
    
    return(
        <>
        <Container>
			<Row><Col className="text-center">Slots</Col></Row>
			<Row>
				<Col className="text-center">
					<Button href="/slots/fruitparty">Fruit Party</Button>
				</Col>
			</Row>
		</Container>
        </>
    )
}

export default SlotsPage;