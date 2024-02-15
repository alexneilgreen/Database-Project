import React from "react";

function RegisterForm() {
	return (
		<form id="register" className="input-group">
			<input
				type="text"
				className="input-field"
				placeholder="Enter Username"
				required
			/>
			<input
				type="password"
				className="input-field"
				placeholder="Enter Password"
				required
			/>
			<input
				type="email"
				className="input-field"
				placeholder="Enter Email"
				required
			/>
			<input type="checkbox" className="check-box" />
			<span>Are you an RSO Owner?</span>
			<button type="submit" className="submit-btn">
				Register
			</button>
		</form>
	);
}

export default RegisterForm;
