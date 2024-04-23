import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const PlayerContext = createContext({});

function PlayerProvider({ children }) {
	const [players, setPlayers] = useState({});

	function addPlayer(name, type, bankRoll) {
		const newPlayer = {
			_id: uuidv4(),
			name: name,
			type: type,
			bankRoll: bankRoll,
			hand: [],
			handValue: 0,
		};
		setPlayers((prevPlayers) => ({ ...prevPlayers, [newPlayer._id]: newPlayer }));
	}

	return <PlayerContext.Provider value={{ players, setPlayers, addPlayer }}>{children}</PlayerContext.Provider>;
}

export default PlayerProvider;
