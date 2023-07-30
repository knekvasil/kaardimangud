import React, { useEffect, useContext, useState } from "react";
import "./Gin13Page.css";
import { DeckContext } from "../../context/Blackjack/DeckContext";
import { FieldContext } from "../../context/Gin13/FieldContext";
import { GameContext } from "../../context/Gin13/GameContext";
import { PlayerContext } from "../../context/shared/PlayerContext";
import { HandContext } from "../../context/Gin13/HandContext";
import Card from "../../components/common/Card";

function Gin13Page() {
	const { deck, shuffle } = useContext(DeckContext);
	const { players } = useContext(PlayerContext);
	const { isTurnOver, initializePlayers } = useContext(GameContext);
	const { field } = useContext(FieldContext);
	const { drawHands } = useContext(HandContext);

	const [selectedCards, setSelectedCards] = useState([]);
	const [handsDrawn, setHandsDrawn] = useState(false); // New state to track if hands are drawn

	function handleCardClick(card) {
		if (selectedCards.includes(card)) {
			setSelectedCards(selectedCards.filter((selectedCard) => selectedCard !== card));
		} else {
			setSelectedCards([...selectedCards, card]);
		}
	}

	useEffect(() => {
		console.log("Selected Cards:", selectedCards);
	}, [selectedCards]);

	useEffect(() => {
		console.log("Players:", players);
	}, [players]);

	function startGame() {
		initializePlayers(4);
	}

	// Call drawHands when players are initialized and hands are not drawn yet
	useEffect(() => {
		if (Object.keys(players).length > 0 && !handsDrawn) {
			drawHands();
			setHandsDrawn(true);
		}
	}, [players, handsDrawn]);

	return (
		<>
			<button onClick={shuffle}>Shuffle</button>
			<button onClick={startGame}>Start</button>
			{Object.values(players).map((player) => (
				<div key={player._id}>
					<h2>{player.name}'s Hand:</h2>
					<div className="hand-container">
						{player.hand.map((card, index) => (
							<button
								key={index}
								variant="link"
								className="btn btn-link border-0 p-0"
								onClick={() => handleCardClick(card)}
							>
								<Card data={card} />
							</button>
						))}
					</div>
				</div>
			))}
		</>
	);
}

export default Gin13Page;
