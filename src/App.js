import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import CreateRSOPage from "./pages/CreateRSOPage";
import EditRSOPage from "./pages/EditRSOPage";
import TestPage from "./pages/TestPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" index element={<LoginPage />} />
				<Route path="/main" index element={<MainPage />} />
				<Route path="/createRSO" index element={<CreateRSOPage />} />
				<Route path="/editRSO" index element={<EditRSOPage />} />
				<Route path="/test" index element={<TestPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
