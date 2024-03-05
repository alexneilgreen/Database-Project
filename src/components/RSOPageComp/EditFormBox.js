import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../css/RSOPageStyles.css";
import logo from "../../images/UCF_Logo_Clean_Horizontal.jpg";

import axios from "axios";

//NOTE: "CREATE EVENT" IS UNNECESSARY AND SHOULD BE REMOVED

function FormBox() {
	const [adminCode, setAdminCode] = useState("");
	const [rsoName, setRsoName] = useState("");
	const [rsoDescription, setRsoDescription] = useState("");

	//GET DATA

	let rsoId;
	let adminId;

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
			const response = await axios.post(`http://localhost:3001/edit-rso/${rsoId}/${adminId}`, {
				rsoName: rsoName,
				rsoDescription: rsoDescription,
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

	const handleDelete = async (e) => {
		e.preventDefault();

		//CHECK IF LAST ADMIN/ASK FOR CONFIRMATION

		//GET DATA

		try {
			const response = await axios.post(`http://localhost:3001/delete-event/${rsoId}/${adminId}`);
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
				<h2 class="rso-title">Edit New RSO</h2>
				<form id="rsoForm">
					<input type="text" name="rsoName" placeholder="RSO Name" required 
						onChange={(e) => setRsoName(e.target.value)}
					/>
					<textarea
						name="rsoDescription"
						placeholder="RSO Description - Max 300 Characters"
						maxlength="300"
						onChange={(e) => setRsoDescription(e.target.value)}
						required
					></textarea>
					<div>
						<button type="submit" className="rso-create-event-btn">
							Create Event
						</button>
						<button type="submit" className="rso-edit-btn" onClick={handleSubmit}>
							Edit
						</button>
						<button type="submit" className="rso-delete-btn" onClick={handleDelete}>
							Delete
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default FormBox;
