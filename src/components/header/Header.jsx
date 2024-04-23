import { React, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom';

import './Header.css'

function Header() {

	useLocation();

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
  	const handleShow = () => setShow(true);
  	const [open, setOpen] = useState(false);
	const [slotsOpen, setSlotsOpen] = useState(false)

	return (
		<>
		<Navbar bg="dark" data-bs-theme="dark">
			<Container>
				<Nav className="justify-content-left" style={{ flex: 1 }}>
					<Button variant="dark" size="lg" onClick={handleShow}><FontAwesomeIcon icon={faBars} size="xl"/></Button>
				</Nav>
				
				<Navbar.Toggle />
				<Nav className="justify-content-left" style={{ flex: 1 }}>
					<Nav.Brand><h4>Kaardimangud</h4></Nav.Brand>
				</Nav>
				<Nav className="justify-content-end">
			        <Navbar.Text>
			          Signed in as: username
			        </Navbar.Text>
        		</Nav>
			</Container>
		</Navbar>

		<Offcanvas show={show} onHide={handleClose}>
	        <Offcanvas.Header closeButton>
	          <Offcanvas.Title><h1>Kaardimangud</h1></Offcanvas.Title>
	        </Offcanvas.Header>
	        <Offcanvas.Body>
	        	<h3><a href="/" className="menuItem">Home</a></h3>
	        	<h3><a href="/dashboard" className="menuItem">Dashboard</a></h3>
	        	<h3 onClick={() => setOpen(!open)} 
	        		aria-controls="subMenu" 
	        		aria-expanded={open} className="menuItem"
	        	>
		        	Card Games
		      	</h3>
			    <Collapse in={open}>
			    	<div id="subMenu">
				        <ul className="subMenu">
				        	<li><h5><a href="/blackjack" className="menuItem">Blackjack</a></h5></li>
				        	<li><h5><a href="/gin13" className="menuItem">Gin13</a></h5></li>
				        </ul>
			      	</div>
			    </Collapse>

				<h3 onClick={() => setSlotsOpen(!slotsOpen)} 
	        		aria-controls="subMenu" 
	        		aria-expanded={slotsOpen} className="menuItem"
				>
					Slots
				</h3>
				<Collapse in={slotsOpen}>
					<div id="subMenu">
						<ul className="subMenu"> 
							<li><h5><a href='/slots' className='menuItem'>Slots Home</a></h5></li>
							<li><h5><a href='/slots/fruitparty' className='menuItem'>Fruit Party</a></h5></li>
						</ul>
					</div>
				</Collapse>
	        </Offcanvas.Body>
      	</Offcanvas>
		</>
	);
}

function getPageName(URL) {
	let URLParts = URL.split('/');
	let pageName = URLParts[3].toUpperCase();
	return pageName == '' ? 'HOME' : pageName
}

export default Header;
