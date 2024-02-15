import React from "react";

import "../../css/MainPageStyles.css";

function Feed() {
	return (
		<div className="container">
			<div className="feed">{/* Your feed content */}</div>
			<div className="map">
				<div
					className="content-box"
					id="mapContainer"
					style={{ backgroundColor: "aqua" }}
				>
					<button className="map-button" id="btn">
						Fullscreen
					</button>
					<h1>THE MAP</h1>
				</div>
			</div>
		</div>
	);
}

export default Feed;
