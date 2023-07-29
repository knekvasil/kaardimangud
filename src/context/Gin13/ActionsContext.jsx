import { createContext, useContext } from "react";
import { DeckContext } from "../shared/DeckContext";
import { EvaluationContext } from "./EvaluationContext";
import { PlayerContext } from "../shared/PlayerContext";
import { FieldContext } from "./FieldContext";

export const ActionsContext = createContext({});

function ActionsProvider({ children }) {
	const { setBurnDeck } = useContext(DeckContext);
	const { canPlay, canBuild } = useContext(EvaluationContext);
	const { players, setPlayers } = useContext(PlayerContext);
	const { field, setField } = useContext(FieldContext);
	// Remove a card from player's hand and add it to the top of the burn deck.
	function burnCard(playerId, cardIndex) {
		// Create copy of players and playerHand arrays for safe mutability
		const updatedPlayers = [...players];
		const playerHand = [...updatedPlayers[playerId].hand];

		// Remove the burn card from the hand and save it
		const burnedCard = playerHand.splice(cardIndex, 1)[0];

		// Update the players hand with the spliced array
		updatedPlayers[playerId].hand = playerHand;

		setPlayers(updatedPlayers);
		// The most recent burned card will always be at index 0;
		setBurnDeck((prevBurnDeck) => [burnedCard, ...prevBurnDeck]);
	}

	function play(playerId, cardIndices) {
		// Create copy of players and playerHand arrays for safe mutability
		const updatedPlayers = [...players];
		const playerHand = [...updatedPlayers[playerId].hand];

		const playCards = [];

		for (const i of cardIndices) {
			playCards.push(playerHand[i]);
		}

		const isValidMove = canPlay(playCards);

		if (isValidMove) {
			const playedSet = {
				player: playerId,
				cards: playCards,
			};

			setField([...field, playedSet]);
		}
	}

	function build(playerId, cardIndices, buildIndex) {
		// Create copy of players and playerHand arrays for safe mutability
		const updatedPlayers = [...players];
		const playerHand = [...updatedPlayers[playerId].hand];

		const playedCards = [];
		for (const i of cardIndices) {
			playedCards.push(playerHand[i]);
		}

		const updatedField = [...field];
		const buildCards = updatedField[buildIndex].cards;

		const isValidMove = canBuild(playedCards, buildCards);

		if (isValidMove) {
			// TODO setField, setHand
		}
	}
	return <ActionsContext.Provider value={{ burnCard, play, build }}>{children}</ActionsContext.Provider>;
}

export default ActionsProvider;
