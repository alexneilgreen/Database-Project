import React, { useState } from "react";

import "../../css/TestPageStyles.css";

function Test() {
	const [activeTab, setActiveTab] = useState(1);

	const handleTabClick = (tabNumber) => {
		setActiveTab(tabNumber);
	};

	return (
		<div className="test-container">
			<div className="test-tabs">
				<div
					className={`test-tab ${activeTab === 1 && "active"}`}
					onClick={() => handleTabClick(1)}
				>
					Tab 1
				</div>
				<div
					className={`test-tab ${activeTab === 2 && "active"}`}
					onClick={() => handleTabClick(2)}
				>
					Tab 2
				</div>
				<div
					className={`test-tab ${activeTab === 3 && "active"}`}
					onClick={() => handleTabClick(3)}
				>
					Tab 3
				</div>
			</div>
			<div className="test-content">
				{/* Content for each tab */}
				{activeTab === 1 && (
					<div className="test-tab-content">Content for Tab 1</div>
				)}
				{activeTab === 2 && (
					<div className="test-tab-content">Content for Tab 2</div>
				)}
				{activeTab === 3 && (
					<div className="test-tab-content">Content for Tab 3</div>
				)}
			</div>
		</div>
	);
}

export default Test;
