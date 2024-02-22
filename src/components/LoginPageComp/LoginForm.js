import React from "react";

function LoginForm() {
	return (
		<form id="login" className="log-input-group">
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
			<input type="checkbox" className="log-check-box" />
			<span>Remember Password</span>
			<button type="submit" className="log-submit-btn">
				Log In
			</button>
		</form>
	);
}

export default LoginForm;
