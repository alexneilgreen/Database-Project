import React, { useEffect } from "react";

function FormScript() {
	useEffect(() => {
		const form = document.getElementById("formBox");
		const x = document.getElementById("login");
		const y = document.getElementById("register");
		const z = document.getElementById("btn");

		function loginForm() {
			form.style.height = "400px";
			x.style.left = "50px";
			y.style.left = "450px";
			z.style.left = "0px";
		}

		function registerForm() {
			form.style.height = "450px";
			x.style.left = "-400px";
			y.style.left = "50px";
			z.style.left = "110px";
		}

		// Event listeners for button clicks
		z.addEventListener("click", loginForm);
		y.addEventListener("click", registerForm);

		// Clean up event listeners on component unmount
		return () => {
			z.removeEventListener("click", loginForm);
			y.removeEventListener("click", registerForm);
		};
	}, []);

	return null; // This component doesn't render anything visible
}

export default FormScript;
