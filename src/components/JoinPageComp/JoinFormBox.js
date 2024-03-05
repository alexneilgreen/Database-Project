import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../css/JoinPageStyles.css";
import logo from "../../images/UCF_Logo_Clean_Horizontal.jpg";

import axios from "axios";

//Note: RSO name is not needed in the API call

function FormBox() {
	const [adminCode, setAdminCode] = useState("");

	let rsoId;
	let adminId;

	const handleSubmit = async (e) => {
		e.preventDefault();

		//GET DATA

		try {
			const response = await axios.post("http://localhost:3001/administrate-rso", {
				adminId: adminId,
				rsoId: rsoId,
				adminCode: adminCode
			});
			if (response.data.code === "good") {

				//MOVE BACK TO MAIN
	
			} else {
				// Handle failure
				console.log(new Error(response.data.message));
			}
		} catch (error) {
			console.error("Error:", error.response.data);
		}
	}

	return (
		<div class="rso-container">
			<div class="rso-form-box">
				<Link to="/main">
					<img src={logo} alt="Logo" className="rso-logo" />
				</Link>
				<h2 class="rso-title">Join RSO</h2>
				<form id="rsoForm">
					<input type="text" name="rsoName" placeholder="RSO Name" required />
					<input type="text" name="rsoCode" placeholder="RSO Code" required 
						onChange={(e) => setAdminCode(e.target.value)}
					/>
					<button type="submit" class="rso-create-btn" onClick={handleSubmit}>
						Join
					</button>
				</form>
			</div>
		</div>
	);
}

export default FormBox;
