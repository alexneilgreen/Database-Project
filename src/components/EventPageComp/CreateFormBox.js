import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../css/EventPageStyles.css";
import logo from "../../images/UCF_Logo_Clean_Horizontal.jpg";

import axios from "axios";

//Send in address and get coordinates
async function geocode(location) {
	try {
	  const response = await axios.get(
		"https://maps.googleapis.com/maps/api/geocode/json?",
		{
		  params: {
			address: location,
			key: "SET TO ENV VARIABLE OR CHANGE ON TEST",
		  },
		}
	  );
  
	  console.log(response);
	  let lat = response.data.results[0].geometry.location.lat;
	  let long = response.data.results[0].geometry.location.lng;
	} catch (error) {
	  console.log(error);
	}
}

function FormBox() {
	const [eventName, setEventName] = useState("");
	const [eventAddress, setEventAddress] = useState("");
	const [eventTime, setEventTime] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	let lat = 0;
	let long = 0;
	let eventId;

	const handleSubmit = async (e) => {
		e.preventDefault();

		//GEOCODE ADDRESS TO GET LAT AND LONG
		
		try {
			const response = await axios.post("http://localhost:3001/create-event", {
				eventName: eventName,
				eventAddress: eventAddress,
				eventLat: 0.00,
				eventLong: 0.00,
				eventTime: eventTime,
				eventDescription: eventDescription
			});
			if (response.data.code === "good") {
				eventId = response.data.eventId;

				//STORE DATA

				//MOVE BACK TO MAIN
	
			} else {
				// Handle failure
				console.log(new Error(response.data.message));
			}
		} catch (error) {
			console.error("Error:", error.response.data);
		}
	}

	return (
		<div className="event-container">
			<div className="event-form-box" id="formBox">
				<Link to="/main">
					<img src={logo} alt="Logo" className="event-logo" />
				</Link>
				<input type="text" id="eventName" placeholder="Event Name" 
					onChange={(e) => setEventName(e.target.value)}
					required
				/>
				<input type="text" id="eventLocation" placeholder="Event Location" 
					onChange={(e) => setEventAddress(e.target.value)}
					aria-required
				/>
				<input type="text" id="eventTime" placeholder="Event Time" 
					onChange={(e) => setEventTime(e.target.value)}
					required
				/>
				<textarea
					id="eventDescription"
					placeholder="Event Description - 200 Character Max"
					maxLength="200"
					onChange={(e) => setEventDescription(e.target.value)}
					required
				></textarea>
				<button type="submit" className="event-create-btn" onClick={handleSubmit}>
					Create
				</button>
			</div>
		</div>
	);
}

export default FormBox;
