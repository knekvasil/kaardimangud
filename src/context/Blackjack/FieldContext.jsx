import { createContext, useContext, useEffect, useState } from "react";
import { PlayerContext } from "../shared/PlayerContext";
import { HandContext } from "./HandContext";
import { GameContext } from "./GameContext"

export const FieldContext = createContext({});

function FieldProvider({ children }) {

	const { game, setGame } = useContext(GameProvider);

	const [gameState, setGameState] = useState({});
	const [players, setPlayers] = useState([])

	function getWinners() {
		
	}

	return (
		<FieldContext.Provider
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
		</FieldContext.Provider>
	);
}


export default FieldProvider;