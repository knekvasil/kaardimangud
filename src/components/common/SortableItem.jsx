import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Card";

function SortableItem(props) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition: transition || undefined,
	};

	return (
		<div ref={setNodeRef} style={style} {...props} {...attributes} {...listeners}>
			<Card data={props.id} />
		</div>
	);
}

export default SortableItem;
