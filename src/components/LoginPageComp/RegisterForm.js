import React from "react";

function RegisterForm() {
	return (
		<form id="register" className="log-input-group">
			<input
				type="text"
				className="log-input-field"
				placeholder="Enter Username"
				required
			/>
			<input
				type="password"
				className="log-input-field"
				placeholder="Enter Password"
				required
			/>
			<input
				type="email"
				className="log-input-field"
				placeholder="Enter Email"
				required
			/>
			<input type="checkbox" className="log-check-box" />
			<span>Are you an RSO Owner?</span>
			<button type="submit" className="log-submit-btn">
				Register
			</button>
		</form>
	);
}

export default RegisterForm;
