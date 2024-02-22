import React from "react";

import "../../css/RSOPageStyles.css";
import logo from "../../images/UCF_Logo_Clean_Horizontal.jpg";

function FormBox() {
	return (
		<div className="RSOcontainer">
			<div className="RSOform-box" id="formBox">
				<img src={logo} alt="Logo" className="RSOlogo" />
				<input type="text" id="eventName" placeholder="Event Name" />
				<input type="text" id="eventLocation" placeholder="Event Location" />
				<input type="text" id="eventTime" placeholder="Event Time" />
				<textarea
					id="eventDescription"
					placeholder="Event Description - 200 Character Max"
					maxLength="200"
				></textarea>
			</div>
		</div>
	);
}

export default FormBox;
