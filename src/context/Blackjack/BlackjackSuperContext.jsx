import React, { createContext } from "react";
import GameProvider from "./GameContext";
import HandProvider from "./HandContext";
import ShoeProvider from "./ShoeContext";

export const BlackjackSuperContext = createContext({});

function BlackjackSuperProvider({ children }) {
	return (
		<BlackjackSuperContext.Provider value={{}}>
			
			<ShoeProvider>
				<HandProvider>
					<GameProvider>
						{children}
					</GameProvider>
				</HandProvider>
			</ShoeProvider>
			
		</BlackjackSuperContext.Provider>
	);
}

export default BlackjackSuperProvider;
