import { useEffect, useContext } from "react";
// import logo from "../../assets/cards/other/logo512.png";

import { DeckContext } from "../../context/shared/DeckContext";
import Card from "../../components/common/Card";

function DashboardPage() {
	// const { deck, resetDecks, testState } = useContext(DeckContext);
	const { deck } = useContext(DeckContext);

	useEffect(() => {
		console.log(deck);
	}, []);

	return (
		<>
			<p>Dashboard</p>

			{deck.map((card) => (
				<Card key={`${card.suit}_${card.value}`} data={card}></Card>
			))}
		</>
	);
}

export default DashboardPage;
