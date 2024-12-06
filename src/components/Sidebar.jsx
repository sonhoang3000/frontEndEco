import React from "react";

const Sidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
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
        {categories.map((category) => (
          <li
            key={category.id}
            style={{
              margin: "10px 0",
              cursor: "pointer",
              fontWeight: selectedCategory === category.id ? "bold" : "normal",
              color: selectedCategory === category.id ? "#d79875" : "#555",
            }}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
