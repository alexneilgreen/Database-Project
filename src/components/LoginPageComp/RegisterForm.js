import React from "react";
import React, { useState } from "react";

function RegisterForm() {
	// Define state variables to store user input
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false); // Assuming isAdmin is a boolean

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Create a user object with the input data
		const newUser = {
			username: username,
			password: password,
			phone: phone,
			email: email,
			isAdmin: isAdmin,
		};

		try {
			// Make a POST request to the register endpoint
			const response = await fetch("http://localhost:3001/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUser),
			});

			// Check if the request was successful
			if (response.ok) {
				// Registration successful, you can redirect or do something else
				console.log("Registration successful");
			} else {
				// Registration failed, handle the error
				const errorData = await response.json();
				console.error("Registration failed:", errorData.message);
			}
		} catch (error) {
			console.error("Error during registration:", error.message);
		}
	};

	return (
		<form id="register" className="log-input-group" onSubmit={handleSubmit}>
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
			<input
				type="phone"
				className="log-input-field"
				placeholder="Enter Phone Number"
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
				required
			/>
			<input
				type="email"
				className="log-input-field"
				placeholder="Enter Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<input
				type="checkbox"
				className="log-check-box"
				checked={isAdmin}
				onChange={(e) => setIsAdmin(e.target.checked)}
			/>
			<span>Are you an RSO Owner?</span>
			<button type="submit" className="log-submit-btn">
				Register
			</button>
		</form>
	);
}

export default RegisterForm;
