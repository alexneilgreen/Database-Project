import React from "react";

function RegisterForm() {
	return (
		<form id="register" className="loginput-group">
			<input
				type="text"
				className="loginput-field"
				placeholder="Enter Username"
				required
			/>
			<input
				type="password"
				className="loginput-field"
				placeholder="Enter Password"
				required
			/>
			<input
				type="email"
				className="loginput-field"
				placeholder="Enter Email"
				required
			/>
			<input type="checkbox" className="logcheck-box" />
			<span>Are you an RSO Owner?</span>
			<button type="submit" className="logsubmit-btn">
				Register
			</button>
		</form>
	);
}

export default RegisterForm;
