import React from "react";
import { Link } from "react-router-dom";

import "../../css/JoinPageStyles.css";
import logo from "../../images/UCF_Logo_Clean_Horizontal.jpg";

function FormBox() {
	return (
		<div class="rso-container">
			<div class="rso-form-box">
				<Link to="/main">
					<img src={logo} alt="Logo" className="rso-logo" />
				</Link>
				<h2 class="rso-title">Join RSO</h2>
				<form id="rsoForm">
					<input type="text" name="rsoName" placeholder="RSO Name" required />
					<input type="text" name="rsoCode" placeholder="RSO Code" required />
					<button type="submit" class="rso-create-btn">
						Join
					</button>
				</form>
			</div>
		</div>
	);
}

export default FormBox;
