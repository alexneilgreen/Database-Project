import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RSOPage from "./pages/RSOPage";
import TestPage from "./pages/TestPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" index element={<LoginPage />} />
				<Route path="/main" index element={<MainPage />} />
				<Route path="/rso" index element={<RSOPage />} />
				<Route path="/test" index element={<TestPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
