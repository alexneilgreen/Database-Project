import React from "react";
import { Link } from "react-router-dom";

import "../../css/EventPageStyles.css";
import logo from "../../images/UCF_Logo_Clean_Horizontal.jpg";

function FormBox() {
	return (
		<div className="event-container">
			<div className="event-form-box" id="formBox">
				<Link to="/main">
					<img src={logo} alt="Logo" className="event-logo" />
				</Link>
				<input type="text" id="eventName" placeholder="Event Name" />
				<input type="text" id="eventLocation" placeholder="Event Location" />
				<input type="text" id="eventTime" placeholder="Event Time" />
				<textarea
					id="eventDescription"
					placeholder="Event Description - 200 Character Max"
					maxLength="200"
				></textarea>
				<button type="submit" className="event-create-btn">
					Create
				</button>
			</div>
		</div>
	);
}

export default FormBox;
