import { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

export const PlayerContext = createContext({});

function PlayerProvider({ children }) {
	const [players, setPlayers] = useState({});

	function addPlayer(name) {
		const newPlayer = {
			name: name,
			hand: [],
			handValue: 0,
		};
		setPlayers((prevPlayers) => ({ ...prevPlayers, [uuidv4()]: newPlayer }));
	}
	return <PlayerContext.Provider value={{ players, setPlayers, addPlayer }}>{children}</PlayerContext.Provider>;
}

export default PlayerProvider;
