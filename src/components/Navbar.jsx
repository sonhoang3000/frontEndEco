import React, { useEffect, useState } from "react";
import "../css/Navbar.css";

import { useNavigate } from "react-router-dom";
import icon from "../assets/icon/location_on.png";
import flag from "../assets/img/Co-Vietnam.webp";
import logo from "../assets/img/logo_mealmate.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); 
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); 
  const [location, setLocation] = useState("Tp. HCM");
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const toggleLocationDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation); 
    setIsOpen(false);
  };

  const handleFoodClick = () => {
    navigate("/ListProduct"); 
  };
  const handleCartClick = () => {
    navigate("/Cart"); 
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsUserDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Meal Mate Logo" className="logo-image" />
        Meal Mate
      </div>

      <div className="find_product">
        <input type="text" placeholder="Tìm kiếm" className="search-bar" />
      </div>

      <div
        className="location"
        onClick={toggleLocationDropdown}
        style={{ cursor: "pointer" }}
      >
        <img src={icon} alt="" className="location_icon" />
        {location}
        {isOpen && (
          <div className="dropdown">
            <div
              className="dropdown-item"
              onClick={() => handleLocationChange("TP.HCM")}
            >
              TP.HCM
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleLocationChange("Hà Nội")}
            >
              Hà Nội
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleLocationChange("Đà Nẵng")}
            >
              Đà Nẵng
            </div>
          </div>
        )}
      </div>

      <div className="menu">
  <div
    className="menu-item"
    onClick={handleFoodClick}
    style={{ cursor: "pointer" }}
  >
    <span>Sản phẩm</span>
    <div className="underline"></div>
  </div>
        
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/Contactpage");
          }}
        >
          Liên Hệ
        </a>
      </div>

      {user?.id ? (
        <div className="userInfo-wrapper">
          <span
            className="login-button"
            onClick={toggleUserDropdown}
            style={{ cursor: "pointer" }}
          >
            {user.name}
          </span>
          {isUserDropdownOpen && (
            <div className="dropdown user-dropdown">
              <div className="dropdown-item" onClick={() => navigate("/profile")}>
                Profile
              </div>
              <div className="dropdown-item" onClick={handleLogout}>
                Logout
              </div>
              <div className="dropdown-item" onClick={handleCartClick}>
                Cart
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="login">
          <button className="login-button" onClick={() => navigate("/login")}>
            Đăng nhập
          </button>
        </div>
      )}

      <div className="language">
        <img src={flag} className="flag" alt="Vietnam Flag" />
      </div>
    </nav>
  );
}

export default Navbar;
