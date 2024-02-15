import React from "react";

import LoginForm from "./LoginForm.js";
import RegisterForm from "./RegisterForm.js";

function FormBox() {
	return (
		<div className="form-box" id="formBox">
			<div className="button-box">
				<div id="btn"></div>
				{/* <button type="button" className="toggle-btn" onClick={loginForm}>
					Log In
				</button>
				<button type="button" className="toggle-btn" onClick={registerForm}>
					Register
				</button> */}
				<button type="button" className="toggle-btn">
					Log In
				</button>
				<button type="button" className="toggle-btn">
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
