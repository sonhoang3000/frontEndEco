import React from "react";

const Sidebar = ({ getAllCategory, setSelectedCategory }) => {

	return (
		<div
			className="sidebar"
			style={{
				width: "200px",
				backgroundColor: "#f8f9fa",
				padding: "20px",
				borderRadius: "8px",
				boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
				marginRight: "20px",
			}}
		>
			<h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Danh mục</h3>
			<ul style={{ listStyle: "none", padding: 0 }}>
				<li
					style={{
						margin: "10px 0",
						cursor: "pointer",
					}}
					onClick={() => setSelectedCategory("ALL")}
				>
					All Categories
				</li>
				{getAllCategory.length > 0 &&
					getAllCategory.map((category, index) => (
						<li
							key={index}
							style={{
								margin: "10px 0",
								cursor: "pointer",
							}}
							onClick={() => setSelectedCategory(category)}
						>
							{category}
						</li>
					))}
			</ul>

		</div>
	);
};

export default Sidebar;
