import React from "react";
import { useEffect } from "react";

import "../../css/LoginPageStyles.css";
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import x from "../../images/x.png";
import google from "../../images/google.png";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import FormScript from "./FormScript";

function FormBox() {
	useEffect(() => {
		// This useEffect hook will call the FormScript functionality when the component mounts
	}, []); // empty dependency array means it only runs once when component mounts

	return (
		<div className="log-form-box" id="log-formBox">
			<FormScript /> {/* Render FormScript component */}
			<div className="log-social-icons">
				<img src={facebook} alt="Facebook" />
				<img src={instagram} alt="Instagram" />
				<img src={x} alt="X" />
				<img src={google} alt="Google" />
			</div>
			<LoginForm />
			<RegisterForm />
		</div>
	);
}

export default FormBox;
