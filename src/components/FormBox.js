import React from "react";
import React, { useEffect } from "react";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import FormScript from "./FormScript"; // Import the FormScript component

function FormBox() {
	useEffect(() => {
		// This useEffect hook will call the FormScript functionality when the component mounts
	}, []); // empty dependency array means it only runs once when component mounts

	return (
		<div className="form-box" id="formBox">
			<div className="button-box">
				<div id="btn"></div>
				<button
					type="button"
					className="toggle-btn"
					onClick={FormScript.loginForm}
				>
					Log In
				</button>
				<button
					type="button"
					className="toggle-btn"
					onClick={FormScript.registerForm}
				>
					Register
				</button>
			</div>
			<div className="social-icons">
				<img src="images/facebook.png" alt="Facebook" />
				<img src="images/instagram.png" alt="Instagram" />
				<img src="images/x.png" alt="X" />
				<img src="images/google.png" alt="Google" />
			</div>
			<LoginForm />
			<RegisterForm />
		</div>
	);
}

export default FormBox;
