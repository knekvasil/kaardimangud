import React, { useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { DeckContext } from "../../context/shared/DeckContext";
import { FieldContext } from "../../context/Gin13/FieldContext";
import { GameContext } from "../../context/Gin13/GameContext";
import { PlayerContext } from "../../context/shared/PlayerContext";
import Card from "../../components/common/Card";

function Gin13Page() {
	const { deck, shuffle } = useContext(DeckContext);
	// const { players } = useContext(PlayerContext);
	const { isTurnOver } = useContext(GameContext);
	const { field } = useContext(FieldContext);

	useEffect(() => {
		// This effect runs when the component mounts or when `deck` changes.
		console.log("Deck changed:", deck);
	}, [deck]);

	return (
		<>
			<button onClick={shuffle}>Shuffle</button>
			{deck.map((card) => (
				<Card key={`${card.suit}_${card.value}`} data={card} />
			))}
		</>
	);
}
export default Gin13Page;
