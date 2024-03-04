import React from "react";

// import "../css/MainPageStyles";

// import "../components/MainPageComp/MainScript.js";

import MainHeader from "../components/MainPageComp/MainHeader";
import Feed from "../components/MainPageComp/FeedSection";
import Map from "../components/MainPageComp/MapSection.js";

const MainPage = () => {
	return (
		<div>
			<MainHeader />
			<div className="main-container">
				<Feed />
				<Map />
			</div>
		</div>
	);
};

export default MainPage;
