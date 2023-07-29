import React, { createContext } from "react";
import ActionsProvider from "./ActionsContext";
import EvaluationProvider from "./EvaluationContext";
import FieldProvider from "./FieldContext";
import GameProvider from "./GameContext";
import HandProvider from "./HandContext";
import ScoreTrackProvider from "./ScoreTrackContext";

export const GinSuperContext = createContext({});

function GinSuperProvider({ children }) {
	return (
		<GinSuperContext.Provider value={{}}>
			<ActionsProvider>
				<EvaluationProvider>
					<FieldProvider>
						<GameProvider>
							<HandProvider>
								<ScoreTrackProvider>{children}</ScoreTrackProvider>
							</HandProvider>
						</GameProvider>
					</FieldProvider>
				</EvaluationProvider>
			</ActionsProvider>
		</GinSuperContext.Provider>
	);
}

export default GinSuperProvider;
