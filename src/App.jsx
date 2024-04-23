//import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/home/HomePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import BlackjackPage from "./pages/Blackjack/BlackjackPage";
import Gin13Page from "./pages/Gin13/Gin13Page";
import SlotsPage from "./pages/slots/SlotsPage";
import FruitPartyPage from "./pages/slots/fruitparty/FruitPartyPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/dashboard" element={<DashboardPage />}></Route>
				<Route path="/gin13" element={<Gin13Page />}></Route>
				<Route path="/blackjack" element={<BlackjackPage />}></Route>
				<Route path="/slots" element={<SlotsPage />}></Route>
				<Route path="/slots/fruitparty" element={<FruitPartyPage />}></Route>
				<Route path="*" element={<Navigate to="/dashboard" replace={true} />}></Route>
			</Routes>
		</div>
	);
}

export default App;
