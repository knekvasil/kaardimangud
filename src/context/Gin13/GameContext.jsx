import { createContext, useContext, useEffect, useState } from "react";
import { PlayerContext } from "../shared/PlayerContext";
import { HandContext } from "./HandContext";

export const GameContext = createContext({});

function GameProvider({ children }) {
	const rounds = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

	const { players, addPlayer } = useContext(PlayerContext);
	const { drawHands } = useContext(HandContext);

	const [playerIds, setPlayerIds] = useState([]);
	const [gameState, setGameState] = useState({});
	const [currentWild, setCurrentWild] = useState(rounds[0]);
	const [isTurnOver, setIsTurnOver] = useState(false);
	const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

	useEffect(() => {
		// Update playerIds whenever players change
		const updatedPlayerIds = players ? Object.keys(players) : [];
		setPlayerIds(updatedPlayerIds);
	}, [players]);

	useEffect(() => {
		if (isTurnOver) {
			setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % playerIds.length);
			setIsTurnOver(false);
		}
	}, [isTurnOver, playerIds]);

	function startGame(playerCount) {
		let isRoundOver = false;

		initializePlayers(playerCount);
		for (const i in rounds) {
			isRoundOver = false;
			setCurrentWild(rounds[i]);
			drawHands();

			while (!isRoundOver) {
				const currentPlayerId = playerIds[currentPlayerIndex];
				const currentPlayer = players[currentPlayerId];
				// TODO: Handle player actions

				if (currentPlayer.hand.length === 0) {
					isRoundOver = true;
				}
			}
		}
	}

	function initializePlayers(count) {
		for (let i = 0; i < count; i++) {
			addPlayer(`Player ${i}`);
		}
	}

	return (
		<GameContext.Provider
			value={{
				gameState,
				setGameState,
				currentWild,
				setCurrentWild,
				isTurnOver,
				setIsTurnOver,
				startGame,
				initializePlayers,
			}}
		>
			{children}
		</GameContext.Provider>
	);
}

export default GameProvider;
