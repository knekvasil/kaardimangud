import React, { createContext } from "react";
import ActionsProvider from "./ActionsContext";
import EvaluationProvider from "./EvaluationContext";
import FieldProvider from "./FieldContext";
import GameProvider from "./GameContext";
import HandProvider from "./HandContext";
import ScoreTrackProvider from "./ScoreTrackContext";
import DeckProvider from "./DeckContext";

export const GinSuperContext = createContext({});

function GinSuperProvider({ children }) {
	return (
		<GinSuperContext.Provider value={{}}>
			<GameProvider>
				<DeckProvider>
					<ActionsProvider>
						<EvaluationProvider>
							<FieldProvider>
								<HandProvider>
									<ScoreTrackProvider>{children}</ScoreTrackProvider>
								</HandProvider>
							</FieldProvider>
						</EvaluationProvider>
					</ActionsProvider>
				</DeckProvider>
			</GameProvider>
		</GinSuperContext.Provider>
	);
}

export default GinSuperProvider;
