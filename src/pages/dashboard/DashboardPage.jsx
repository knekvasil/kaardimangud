import React from 'react';
import '../../styles/global.css'
import Header from '../../components/header/Header'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function DashboardPage() {

	return (
		<>
		<Container>
			<Row><Col className="text-center">Dashboard</Col></Row>
			<Row>
				<Col className="text-center">
					<Button href="/blackjack">Blackjack</Button>
				</Col>
				<Col className="text-center">
					<Button variant="success" href="/gin13">Gin13</Button>
				</Col>
				<Col className='text-center'>
					<Button variant='warning' href='/slots'>Slots</Button>
				</Col>
			</Row>
		</Container>
		</>
	);
}
export default DashboardPage;
