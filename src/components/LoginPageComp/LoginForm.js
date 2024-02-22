import React from "react";

function LoginForm() {
	return (
		<form id="login" className="loginput-group">
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
			<input type="checkbox" className="logcheck-box" />
			<span>Remember Password</span>
			<button type="submit" className="logsubmit-btn">
				Log In
			</button>
		</form>
	);
}

export default LoginForm;
