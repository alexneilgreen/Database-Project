import React from "react";

import "../../css/MainPageStyles.css";

function Feed() {
	return (
		<div class="feed">
			<div class="content-box">
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

					{/* <div class="post-box">
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
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default Feed;
