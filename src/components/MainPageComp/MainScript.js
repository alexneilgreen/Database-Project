import React, { useEffect } from "react";

function MainScript() {
	function getFullscreenElement() {
		return (
			document.fullscreenElement ||
			document.webkitFullscreenElement ||
			document.mozFullscreenElement ||
			document.msFullscreenElement
		);
	}

	function toggleFullscreen() {
		if (getFullscreenElement()) {
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
	}

	useEffect(() => {
		document.getElementById("btn").addEventListener("click", toggleFullscreen);
		return () => {
			document
				.getElementById("btn")
				.removeEventListener("click", toggleFullscreen);
		};
	}, []);

	return null; // This component doesn't render anything visible
}

export default MainScript;
