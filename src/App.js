import logo from "./logo.svg";
import "./App.css";

function App() {
	return (
		<section>
			<div class="top-banner">
				<img
					src="images/UCF_Logo_Clean_Horizontal_Alt.jpg"
					class="logo"
					alt="Logo"
				/>
				<div class="button-container">
					<div class="button">My Schedule</div>
					<div class="button">Feed</div>
					<div class="button">Discover</div>
					<div class="button">Log Out</div>
				</div>
			</div>
			<div class="container">
				<div class="feed">
					<div class="content-box">
						<div class="search-bar">
							<input
								class="search-bar-text"
								type="text"
								placeholder="Search..."
							/>
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

				<div class="map">
					<div
						class="content-box"
						id="mapContainer"
						// style="background-color: aqua"
					>
						<button class="map-button" id="btn">
							Fullscreen
						</button>
						<h1>THE MAP</h1>
					</div>
				</div>
			</div>
		</section>
	);
}

export default App;
