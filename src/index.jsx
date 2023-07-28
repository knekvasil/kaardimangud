import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import DeckProvider from "./context/shared/DeckContext";
import ShoeProvider from "./context/Blackjack/ShoeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<DeckProvider>
			<ShoeProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ShoeProvider>
		</DeckProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
