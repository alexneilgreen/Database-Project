import React from "react";
import { Link } from "react-router-dom";

import "../../css/RSOPageStyles.css";
import logo from "../../images/UCF_Logo_Clean_Horizontal.jpg";

function FormBox() {
	return (
		<div class="rso-container">
			<div class="rso-form-box">
				<Link to="/main">
					<img src={logo} alt="Logo" className="rso-logo" />
				</Link>
				<h2 class="rso-title">Create New RSO</h2>
				<form id="rsoForm">
					<input type="text" name="rsoName" placeholder="RSO Name" required />
					<textarea
						name="rsoDescription"
						placeholder="RSO Description - Max 300 Characters"
						maxlength="300"
						required
					></textarea>
					<button type="submit" class="rso-create-btn">
						Create
					</button>
				</form>
			</div>
		</div>
	);
}

export default FormBox;
