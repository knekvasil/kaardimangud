import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import DeckProvider from "./context/Blackjack/DeckContext";
import ShoeProvider from "./context/Blackjack/ShoeContext";
import GinSuperProvider from "./context/Gin13/GinSuperContext";
import PlayerProvider from "./context/shared/PlayerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<PlayerProvider>
			<GinSuperProvider>
				<DeckProvider>
					<ShoeProvider>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</ShoeProvider>
				</DeckProvider>
			</GinSuperProvider>
		</PlayerProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
