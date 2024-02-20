import React from "react";

class FormScript extends React.Component {
	loginForm = () => {
		const form = document.getElementById("formBox");
		const x = document.getElementById("login");
		const y = document.getElementById("register");
		const z = document.getElementById("btn");

		form.style.height = "400px";
		x.style.left = "50px";
		y.style.left = "450px";
		z.style.left = "0px";
	};

	registerForm = () => {
		const form = document.getElementById("formBox");
		const x = document.getElementById("login");
		const y = document.getElementById("register");
		const z = document.getElementById("btn");

		form.style.height = "450px";
		x.style.left = "-400px";
		y.style.left = "50px";
		z.style.left = "110px";
	};

	render() {
		return (
			<div className="button-box">
				<div id="btn"></div>
				<button
					type="button"
					className="toggle-btn"
					onClick={this.loginForm} // Call the loginForm function
				>
					Log In
				</button>
				<button
					type="button"
					className="toggle-btn"
					onClick={this.registerForm} // Call the registerForm function
				>
					Register
				</button>
			</div>
		);
	}
}

export default FormScript;
