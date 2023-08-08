import { createContext, useState, useContext } from "react";
import { STATE } from '../../constants/game'

export const GameContext = createContext({});

function GameProvider({ children }) {

	const [gameState, setGameState] = useState(STATE.START_PAGE);
	const [numberOfPlayers, setNumberOfPlayers] = useState(1);
	const [turn, setTurn] = useState("");
	const [alreadyHit, setAlreadyHit] = useState(false);
	const [activePlayers, setActivePlayers] = useState([]);

	return (
		<GameContext.Provider
			value={{
				gameState,
				setGameState,
				numberOfPlayers,
				setNumberOfPlayers,
				turn,
				setTurn,
				alreadyHit,
				setAlreadyHit,
				activePlayers,
				setActivePlayers
			}}
		>
			{children}
		</GameContext.Provider>
	);
}

export default GameProvider;