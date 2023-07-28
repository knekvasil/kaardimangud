import React, { useEffect, useContext } from "react";
import { ShoeContext } from "../../context/Blackjack/ShoeContext";
import Card from "../../components/common/Card";

function BlackjackPage() {
	const { shoe, shuffleShoe } = useContext(ShoeContext);

	useEffect(() => {}, [shoe]);

	return (
		<>
			<button onClick={shuffleShoe}>Shuffle</button>
			{shoe?.map((card, index) => (
				<Card key={`${card.suit}_${card.value}_${index}`} data={card} />
			))}
		</>
	);
}
export default BlackjackPage;
