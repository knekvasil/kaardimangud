import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/home/HomePage";
import DashboardPage from "./pages/dashboard/DashboardPage";

function App() {
	return (
		<div className="App">
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"></link>

			<Header />
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/dashboard" element={<DashboardPage />}></Route>
			</Routes>
		</div>
	);
}

export default App;
