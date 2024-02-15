import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import { AuthContextProvider } from "./useContext/LoginContext";

function App() {
	return (
		<AuthContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/main" index element={<MainPage />} />
					<Route path="/login" index element={<LoginPage />} />
				</Routes>
			</BrowserRouter>
		</AuthContextProvider>
	);
}

export default App;
