import React, { useEffect, useContext } from "react";
import { DeckContext } from "../../context/shared/DeckContext";
import Card from "../../components/common/Card";

function DashboardPage() {
	const { deck, shuffle } = useContext(DeckContext);

	useEffect(() => {
		// This effect runs when the component mounts or when `deck` changes.
		console.log("Deck changed:", deck);
	}, [deck]);

	return (
		<>
			<p>Dashboard</p>
			<button onClick={shuffle}>Shuffle</button>
			{deck.map((card) => (
				<Card key={`${card.suit}_${card.value}`} data={card} />
			))}
		</>
	);
}
export default DashboardPage;
