import React from "react";

import "../../css/MainPageStyles.css";
import logo from "../../images/UCF_Logo_Clean_Horizontal_Alt.jpg";

function MainHeader() {
	return (
		<div className="top-banner">
			<img src={logo} className="logo" alt="Logo" />
			<div className="button-container">
				<div className="button">My Schedule</div>
				<div className="button">Feed</div>
				<div className="button">Discover</div>
				<div className="button">Log Out</div>
			</div>
		</div>
	);
}

export default MainHeader;
