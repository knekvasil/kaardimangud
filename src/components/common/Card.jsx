function Card(props) {
	const svgPath = props.svg;
	const cardTag = `${props.value}${props.suit[0]}`;
	return (
		<>
			<img src={svgPath} alt={cardTag} />
		</>
	);
}

export default Card;
