import React from 'react';
import '../../styles/global.css'
import Header from '../../components/header/Header'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function HomePage() {

	return (
		<>
		<Container>
			<Row><Col className="text-center">HomePage</Col></Row>
			<Row>
				<Col className="text-center">
					<Button href="/dashboard">Go to Dashboard</Button>
				</Col>
			</Row>
		</Container>
		</>
	);
}
export default HomePage;
