function Card(props) {
	const { png, value, suit, backPng, faceDown } = props.data;
	const cardTag = faceDown ? "Face-Down" : `${value}${suit[0]}`;
	const cardImg = faceDown ? backPng : png;

	return (
		<>
			<img src={cardImg} alt={cardTag} />
		</>
	);
}

export default Card;