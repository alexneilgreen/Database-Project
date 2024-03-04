// import React from "react";
import React, { useState } from "react";
import axios from "axios";

function LoginForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:3001/login", {
				username,
				password,
			});
			console.log(response.data);
			// Handle successful login, such as redirecting to another page
		} catch (error) {
			console.error("Login failed:", error.response.data.message);
			// Handle login failure, such as displaying an error message
		}
	};

	return (
		<form id="login" className="log-input-group" onSubmit={handleLogin}>
			<input
				type="text"
				className="log-input-field"
				placeholder="Enter Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
			/>
			<input
				type="password"
				className="log-input-field"
				placeholder="Enter Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			{/* <input type="checkbox" className="log-check-box" />
			<span>Remember Password</span> */}
			<br />
			<button type="submit" className="log-submit-btn">
				Log In
			</button>
		</form>
	);
}

export default LoginForm;
