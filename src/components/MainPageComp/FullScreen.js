import React from "react";

class FullScreen extends React.Component {
	getFullscreenElement() {
		return (
			document.fullscreenElement ||
			document.webkitFullscreenElement ||
			document.mozFullscreenElement ||
			document.msFullscreenElement
		);
	}

	toggleFullscreen = () => {
		if (this.getFullscreenElement()) {
			document.exitFullscreen();
			document.getElementById("btn").textContent = "Fullscreen";
			console.log("Map Exit Fullscreen");
		} else {
			document
				.getElementById("mapContainer")
				.requestFullscreen()
				.catch(console.log);
			document.getElementById("btn").textContent = "Exit Fullscreen";
			console.log("Map Enter Fullscreen");
		}
	};

	render() {
		return (
			<div class="map-content-box" id="mapContainer">
				<button class="map-button" id="btn" onClick={this.toggleFullscreen}>
					Fullscreen
				</button>

				<h1>THE MAP</h1>
			</div>
		);
	}
}

export default FullScreen;
