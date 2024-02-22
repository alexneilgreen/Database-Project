import React, { useState, useEffect } from "react";

import "../../css/MainPageStyles.css";

function Feed() {
	const [activeTab, setActiveTab] = useState(1);
	const [modalOpen, setModalOpen] = useState(false); // State to manage modal open/close

	const handleTabClick = (tabNumber) => {
		setActiveTab(tabNumber);
	};

	const handleRSONameClick = () => {
		setModalOpen(true); // Open the modal when RSO name is clicked
	};

	const closeModal = () => {
		setModalOpen(false); // Close the modal
	};

	useEffect(() => {
		// Add event listener to close the modal when clicking outside of the white div
		const handleClickOutsideModal = (event) => {
			const modal = document.querySelector(".modal");
			if (modal && !modal.contains(event.target)) {
				closeModal();
			}
		};

		document.addEventListener("mousedown", handleClickOutsideModal);

		return () => {
			document.removeEventListener("mousedown", handleClickOutsideModal);
		};
	}, []);

	return (
		<div className="feed-section">
			<div className="feed-content-box">
				<div className="tabs">
					<div
						className={`tab ${activeTab === 1 && "active"}`}
						onClick={() => handleTabClick(1)}
					>
						My Schedule
					</div>
					<div
						className={`tab ${activeTab === 2 && "active"}`}
						onClick={() => handleTabClick(2)}
					>
						Feed
					</div>
					<div
						className={`tab ${activeTab === 3 && "active"}`}
						onClick={() => handleTabClick(3)}
					>
						Discover
					</div>
				</div>
				<div className="search-bar">
					<input
						className="search-bar-text"
						type="text"
						placeholder="Search..."
					/>
					<button type="search-bar-button">Search</button>
				</div>
				<div className="posts-container">
					<div className="post-box">
						<div className="post-header">
							<h4>Event Name</h4>
							<h4>Event Time</h4>
							<h4>Event Location</h4>
						</div>
						<div className="post-description">
							<p>
								Event Description Event Description Event Description Event
								Description Event Description Event Description Event
								Description Event Description Event Description
							</p>
						</div>
						<div className="post-footer">
							<p>
								RSO:{" "}
								<strong id="post1" onClick={handleRSONameClick}>
									RSO Name
								</strong>
							</p>
							<button>Map</button>
						</div>
					</div>
				</div>
			</div>
			{modalOpen && (
				<div className="modal-background">
					<div className="modal">
						<div className="modal-content">
							<h2 className="modal-header">RSO Name</h2>
							<p className="modal-description">
								Description of the RSO goes here. Description of the RSO goes
								here. Description of the RSO goes here. Description of the RSO
								goes here. Description of the RSO goes here. Description of the
								RSO goes here. Description of the RSO goes here. Description of
								the RSO goes here.
							</p>
							<div className="modal-buttons">
								<button className="modal-follow">Follow</button>
								<button className="modal-join">Join as Admin</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Feed;
