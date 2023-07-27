import { React, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';

function Header() {

	useLocation();

	return (
		<Navbar bg="dark" data-bs-theme="dark">
			<Container>
				<Navbar.Brand href="/dashboard">Kaardimangud</Navbar.Brand>
				<Navbar.Toggle />
				<Nav className="justify-content-center" style={{ flex: 1 }}>
					<Nav.Text>{getPageName(window.location.href)}</Nav.Text>
				</Nav>
				<Nav className="justify-content-end">
			        <Navbar.Text>
			          Signed in as: username
			        </Navbar.Text>
        		</Nav>
			</Container>
		</Navbar>
	);
}

function getPageName(URL) {
	let URLParts = URL.split('/');
	let pageName = URLParts[3].toUpperCase();
	return pageName == '' ? 'HOME' : pageName
}

export default Header;
