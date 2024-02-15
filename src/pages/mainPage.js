import React from "react";

import "../css/MainPageStyles.css";

import Feed from "../components/MainPageComp/Feed.js";

const MainPage = () => {
	return (
		<div>
			<div className="top-banner">
				<img
					src="../images/UCF_Logo_Clean_Horizontal_Alt.jpg"
					// src must be defined in css
					className="logo"
					alt="Logo"
				/>
				<div className="button-container">
					<div className="button">My Schedule</div>
					<div className="button">Feed</div>
					<div className="button">Discover</div>
					<div className="button">Log Out</div>
				</div>
			</div>
			<Feed />
		</div>
	);
};

export default MainPage;
