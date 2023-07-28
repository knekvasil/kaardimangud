import { createContext, useState, useContext } from "react";

export const PlayerContext = createContext({});

const crypto = require("crypto");

function PlayerProvider({ children }) {
	const [players, setPlayers] = useState({});

	function addPlayer(name) {
		const newPlayer = {
			name: name,
			hand: [],
			handValue: 0,
		};
		setPlayers((prevPlayers) => ({ ...prevPlayers, [generateId()]: newPlayer }));
	}
	return <PlayerContext.Provider value={{ players, setPlayers, addPlayer }}>{children}</PlayerContext.Provider>;
}

function generateId() {
	const bytes = crypto.randomBytes(10);
	return bytes.toString("hex");
}

export default PlayerProvider;
