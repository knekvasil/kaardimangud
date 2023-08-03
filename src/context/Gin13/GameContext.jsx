import { createContext, useContext, useEffect, useState } from "react";
import { PlayerContext } from "../shared/PlayerContext";
import { TYPES } from "../../constants/users";

export const GameContext = createContext({});

function GameProvider({ children }) {
	const rounds = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

	const { addPlayer } = useContext(PlayerContext);

	const [playerIds, setPlayerIds] = useState([]);
	const [currentWild, setCurrentWild] = useState(rounds[0]);
	const [hasRoundStarted, setHasRoundStarted] = useState(false);
	const [isTurnOver, setIsTurnOver] = useState(false);
	const [currentPlayerId, setCurrentPlayerId] = useState(null); // Add currentPlayerId state
	const [haveHandsDrawn, setHaveHandsDrawn] = useState(false);
	const [arePlayersInit, setArePlayersInit] = useState(false);

	function initializePlayers(count) {
		for (let i = 0; i < count; i++) {
			addPlayer(`Player ${i}`, TYPES.PLAYER);
		}
		setArePlayersInit(true);
	}

	return (
		<GameContext.Provider
			value={{
				currentWild,
				setCurrentWild,
				hasRoundStarted,
				setHasRoundStarted,
				isTurnOver,
				setIsTurnOver,
				playerIds,
				setPlayerIds,
				currentPlayerId,
				setCurrentPlayerId,
				haveHandsDrawn,
				setHaveHandsDrawn,
				arePlayersInit,
				initializePlayers,
			}}
		>
			{children}
		</GameContext.Provider>
	);
}

export default GameProvider;
