import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../css/RSOPageStyles.css";
import logo from "../../images/UCF_Logo_Clean_Horizontal.jpg";

import axios from "axios";

function FormBox() {
	const [adminCode, setAdminCode] = useState("");
	const [rsoName, setRsoName] = useState("");
	const [rsoDescription, setRsoDescription] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		//GET INFO

		let rsoId;
		let adminId;
		
		try {
			const response = await axios.post("http://localhost:3001/create-rso", {
				adminId: adminId,
				rsoName: rsoName,
				rsoDescription: rsoDescription,
				adminCode: adminCode
			});
			if (response.data.code === "good") {
				rsoId = response.data.rsoId;

				//STORE DATA

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
				<h2 class="rso-title">Create New RSO</h2>
				<form id="rsoForm">
					<input type="text" name="rsoName" placeholder="RSO Name" required 
						onChange={(e) => setRsoName(e.target.value)}
					/>
					<textarea
						name="rsoDescription"
						placeholder="RSO Description - Max 300 Characters"
						maxLength="300"
						onChange={(e) => setRsoDescription(e.target.value)}
						required
					></textarea>
					<button type="submit" class="rso-create-btn" onClick={handleSubmit}>
						Create
					</button>
				</form>
			</div>
		</div>
	);
}

export default FormBox;
