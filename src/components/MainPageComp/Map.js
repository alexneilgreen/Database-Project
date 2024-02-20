import React from "react";

import "../../css/MainPageStyles.css";

import MainScript from "../../components/MainPageComp/MainScript.js";

function Map() {
	return (
		<div class="map">
			<div class="map-content-box" id="mapContainer">
				<button class="map-button" id="btn">
					Fullscreen
				</button>
				<h1>THE MAP</h1>
			</div>
		</div>
	);
}

export default Map;
