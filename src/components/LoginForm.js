import React from "react";

function LoginForm() {
	return (
		<form id="login" className="input-group">
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
			<input type="checkbox" className="check-box" />
			<span>Remember Password</span>
			<button type="submit" className="submit-btn">
				Log In
			</button>
		</form>
	);
}

export default LoginForm;
