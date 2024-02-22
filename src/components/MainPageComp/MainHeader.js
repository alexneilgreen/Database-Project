import React from "react";

import "../../css/MainPageStyles.css";

import logo from "../../images/UCF_Logo_Clean_Horizontal_Alt.jpg";

function MainHeader() {
	return (
		<div className="header-banner">
			<img src={logo} className="header-logo" alt="Logo" />
			<div className="header-button-container">
				<div className="header-button">Create Event</div>
				<div className="header-button">Join RSO Board</div>
				<div className="header-button">Log Out</div>
			</div>
		</div>
	);
}

export default MainHeader;
