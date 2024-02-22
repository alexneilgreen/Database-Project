import React from "react";

import "../../css/RSOPageStyles.css";
import logo from "../../images/UCF_Logo_Clean_Horizontal.jpg";

function FormBox() {
	return (
		<div className="RSO-container">
			<div className="RSO-form-box" id="formBox">
				<img src={logo} alt="Logo" className="RSO-logo" />
				<input type="text" id="eventName" placeholder="Event Name" />
				<input type="text" id="eventLocation" placeholder="Event Location" />
				<input type="text" id="eventTime" placeholder="Event Time" />
				<textarea
					id="eventDescription"
					placeholder="Event Description - 200 Character Max"
					maxLength="200"
				></textarea>
				<div>
					<button type="submit" className="RSO-edit-btn">
						Edit
					</button>
					<button type="submit" className="RSO-delete-btn">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default FormBox;
