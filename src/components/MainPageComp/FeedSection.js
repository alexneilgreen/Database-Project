// import React from "react";
import React, { useState } from "react";

import "../../css/MainPageStyles.css";

function Feed() {
	const [activeTab, setActiveTab] = useState(1);

	const handleTabClick = (tabNumber) => {
		setActiveTab(tabNumber);
	};

	return (
		<div class="feed-section">
			<div class="feed-content-box">
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
				<div class="search-bar">
					<input class="search-bar-text" type="text" placeholder="Search..." />
					<button type="search-bar-button">Search</button>
				</div>
				<div class="posts-container">
					<div class="post-box">
						<div class="post-header">
							<h4>Event Name</h4>
							<h4>Event Time</h4>
							<h4>Event Location</h4>
						</div>
						<div class="post-description">
							<p>
								Event Description Event Description Event Description Event
								Description Event Description Event Description Event
								Description Event Description Event Description
							</p>
						</div>
						<div class="post-footer">
							<p>
								RSO Name: <strong>RSO Name</strong>
							</p>
							<button>Map</button>
						</div>
					</div>

					<div class="post-box">
						<div class="post-header">
							<h4>Event Name</h4>
							<h4>Event Time</h4>
							<h4>Event Location</h4>
						</div>
						<div class="post-description">
							<p>
								Event Description Event Description Event Description Event
								Description Event Description Event Description Event
								Description Event Description Event Description
							</p>
						</div>
						<div class="post-footer">
							<p>
								RSO Name: <strong>RSO Name</strong>
							</p>
							<button>Map</button>
						</div>
					</div>

					<div class="post-box">
						<div class="post-header">
							<h4>Event Name</h4>
							<h4>Event Time</h4>
							<h4>Event Location</h4>
						</div>
						<div class="post-description">
							<p>
								Event Description Event Description Event Description Event
								Description Event Description Event Description Event
								Description Event Description Event Description
							</p>
						</div>
						<div class="post-footer">
							<p>
								RSO Name: <strong>RSO Name</strong>
							</p>
							<button>Map</button>
						</div>
					</div>

					<div class="post-box">
						<div class="post-header">
							<h4>Event Name</h4>
							<h4>Event Time</h4>
							<h4>Event Location</h4>
						</div>
						<div class="post-description">
							<p>
								Event Description Event Description Event Description Event
								Description Event Description Event Description Event
								Description Event Description Event Description
							</p>
						</div>
						<div class="post-footer">
							<p>
								RSO Name: <strong>RSO Name</strong>
							</p>
							<button>Map</button>
						</div>
					</div>

					<div class="post-box">
						<div class="post-header">
							<h4>Event Name</h4>
							<h4>Event Time</h4>
							<h4>Event Location</h4>
						</div>
						<div class="post-description">
							<p>
								Event Description Event Description Event Description Event
								Description Event Description Event Description Event
								Description Event Description Event Description
							</p>
						</div>
						<div class="post-footer">
							<p>
								RSO Name: <strong>RSO Name</strong>
							</p>
							<button>Map</button>
						</div>
					</div>

					<div class="post-box">
						<div class="post-header">
							<h4>Event Name</h4>
							<h4>Event Time</h4>
							<h4>Event Location</h4>
						</div>
						<div class="post-description">
							<p>
								Event Description Event Description Event Description Event
								Description Event Description Event Description Event
								Description Event Description Event Description
							</p>
						</div>
						<div class="post-footer">
							<p>
								RSO Name: <strong>RSO Name</strong>
							</p>
							<button>Map</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Feed;
