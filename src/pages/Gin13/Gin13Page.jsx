import "./Gin13Page.css";
import React, { useState, useEffect, useContext, useCallback } from "react";

import { DeckContext } from "../../context/Blackjack/DeckContext";
import { FieldContext } from "../../context/Gin13/FieldContext";
import { GameContext } from "../../context/Gin13/GameContext";
import { PlayerContext } from "../../context/shared/PlayerContext";
import { HandContext } from "../../context/Gin13/HandContext";
import { DndContext, closestCenter, MouseSensor, TouchSensor, DragOverlay, useSensor, useSensors } from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	horizontalListSortingStrategy,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
// import SortableItem from "../../components/common/SortableItem";
import SortableItem from "../../components/common/SortableItem";
import { Container } from "react-bootstrap";
import Card from "../../components/common/Card";
import { getNextPlayerId } from "../../utils/gameUtils";
import { shuffleDeck } from "../../utils/deckUtils";

function Gin13Page() {
	const { deck, setDeck, shuffle } = useContext(DeckContext);
	const { players, setPlayers } = useContext(PlayerContext);
	const { initializePlayers, playerIds, hasRoundStarted, setHaveHandsDrawn, setPlayerIds, isTurnOver, arePlayersInit } =
		useContext(GameContext);
	const { field } = useContext(FieldContext);
	const { drawHands } = useContext(HandContext);

	const [selectedCards, setSelectedCards] = useState([]);
	const { currentPlayerId, setCurrentPlayerId, setIsTurnOver, setHasRoundStarted, haveHandsDrawn } =
		useContext(GameContext);

	/* ------------- USE EFFECTS ------------- */
	// Handle game start
	useEffect(() => {
		if (hasRoundStarted) {
			initializePlayers(4);
			// Set hasRoundStarted to false after initialization
			setHasRoundStarted(false);
		}
	}, [hasRoundStarted]);

	// Once players initialized, add hands to each
	useEffect(() => {
		if (arePlayersInit) {
			drawHands();
			setHaveHandsDrawn(true);

			// init player turns
			const updatedPlayerIds = players ? Object.keys(players) : [];
			setPlayerIds(updatedPlayerIds);

			if (updatedPlayerIds.length > 0) {
				setCurrentPlayerId(updatedPlayerIds[0]);
			}
		}
	}, [arePlayersInit]);

	// Handle end of turn
	useEffect(() => {
		if (isTurnOver) {
			setCurrentPlayerId((prevPlayerId) => getNextPlayerId(players, prevPlayerId));
			setIsTurnOver(false);
		}
	}, [isTurnOver]);

	/* ------------ PLAYER ACTIONS ----------- */

	function handleStartGame() {
		setHasRoundStarted(true);
	}

	function handleEndTurn() {
		setIsTurnOver(true);
	}

	function handleCardClick(card) {
		if (selectedCards.includes(card)) {
			setSelectedCards(selectedCards.filter((selectedCard) => selectedCard !== card));
		} else {
			setSelectedCards([...selectedCards, card]);
		}
	}

	/* ------------ D&D FUNCTIONALITY ----------- */
	const [activeId, setActiveId] = useState(null);
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

	const handleDragStart = useCallback((event) => {
		setActiveId(event.active.id);
	}, []);

	const handleDragEnd = useCallback(
		(event) => {
			const { active, over } = event;

			if (active.id !== over?.id) {
				// Card is reordered within the same hand
				const activePlayerId = currentPlayerId;
				const activePlayer = players[activePlayerId];
				const activePlayerHand = activePlayer.hand;

				// Find the index of the dragged card in the active player's hand
				const draggedCardIndex = activePlayerHand.indexOf(active.id);

				// Find the index of the drop target card in the active player's hand
				const dropTargetIndex = activePlayerHand.indexOf(over.id);

				// Add temporary animation class to the dragged card container
				const draggedCardContainer = document.getElementById(active.id);
				draggedCardContainer.classList.add("dragging-card");

				// Update the player's hand
				setTimeout(() => {
					const updatedHand = arrayMove(activePlayer.hand, draggedCardIndex, dropTargetIndex);
					setPlayers((prevPlayers) => ({
						...prevPlayers,
						[activePlayerId]: {
							...activePlayer,
							hand: updatedHand,
						},
					}));
				}, 300); // Adjust the delay (300ms) as needed

				// Remove temporary animation class after a small delay
				setTimeout(() => {
					draggedCardContainer.classList.remove("dragging-card");
				}, 100); // Adjust the delay (100ms) as needed
			}

			setActiveId(null);
		},
		[currentPlayerId, players]
	);

	const handleDragCancel = useCallback(() => {
		setActiveId(null);
	}, []);

	return (
		<>
			<button onClick={handleStartGame}>Start</button>
			<button onClick={handleEndTurn}>End Turn</button>
			{haveHandsDrawn && <h3> Current Turn: {players[currentPlayerId].name}</h3>}

			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
			>
				{Object.values(players).map((player) => (
					<div key={player._id}>
						<h2>
							{player.name}'s Hand: ({player.type})
						</h2>
						<SortableContext items={player.hand} strategy={horizontalListSortingStrategy}>
							<div className="d-flex">
								{player.hand.map((card, i) => (
									<SortableItem key={i} id={card} />
								))}
							</div>
						</SortableContext>
					</div>
				))}
			</DndContext>
		</>
	);
}

export default Gin13Page;
