import React from "react";
import { Link } from "react-router-dom";

import "../../css/MainPageStyles.css";

import logo from "../../images/UCF_Logo_Clean_Horizontal_Alt.jpg";

function MainHeader() {
	return (
		<div className="header-banner">
			<img src={logo} className="header-logo" alt="Logo" />
			<div className="header-button-container">
				<Link
					to="/createEvent"
					className="header-button"
					style={{ textDecoration: "none" }}
				>
					Create Event
				</Link>
				<Link
					to="/createRSO"
					className="header-button"
					style={{ textDecoration: "none" }}
				>
					Create RSO
				</Link>
				<Link
					to="/joinRSO"
					className="header-button"
					style={{ textDecoration: "none" }}
				>
					Join RSO Board
				</Link>
				<Link
					to="/"
					className="header-button"
					style={{ textDecoration: "none" }}
				>
					Log Out
				</Link>
			</div>
		</div>
	);
}

export default MainHeader;
