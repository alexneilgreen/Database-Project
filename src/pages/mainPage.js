import React from "react";

// import "../css/MainPageStyles";

import MainHeader from "../components/MainPageComp/MainHeader";
import Feed from "../components/MainPageComp/Feed";
import Map from "../components/MainPageComp/Map.js";

const MainPage = () => {
	return (
		<div>
			<MainHeader />
			<div className="container">
				<Feed />
				<Map />
			</div>
		</div>
	);
};

export default MainPage;
