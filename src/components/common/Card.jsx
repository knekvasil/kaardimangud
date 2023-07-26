function Card(props) {
	const { png, value, suit } = props.data;
	const cardTag = `${value}${suit[0]}`;

	return (
		<>
			<img src={png} alt={cardTag} />
		</>
	);
}

export default Card;
