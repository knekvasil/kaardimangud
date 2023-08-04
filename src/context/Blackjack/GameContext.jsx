import { createContext, useState } from "react";
import { STATE } from '../../constants/game'

export const GameContext = createContext({});

function GameProvider({ children }) {

	const [gameState, setGameState] = useState(STATE.START_PAGE);
	const [numberOfPlayers, setNumberOfPlayers] = useState(1);
	const [playerTurn, setPlayerTurn] = useState("");
	const [alreadyHit, setAlreadyHit] = useState(false);

	return (
		<GameContext.Provider
			value={{
				gameState,
				setGameState,
				numberOfPlayers,
				setNumberOfPlayers,
				playerTurn,
				setPlayerTurn,
				alreadyHit,
				setAlreadyHit
			}}
		>
			{children}
		</GameContext.Provider>
	);
}

export default GameProvider;