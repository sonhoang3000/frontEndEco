import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import flag from "../assets/img/Co-Vietnam.webp";
import logo from "../assets/img/logo_mealmate.png";
import "../css/Navbar.css";

function Navbar() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [user, setUser] = useState();
  const [cartItemCount, setCartItemCount] = useState(0); // For cart item count
  const navigate = useNavigate();

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }

    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItemCount(currentCart.length); // Set the cart item count
  }, []);

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
    navigate("/");
  };


  return (
    <nav className="navbar">
      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img src={logo} alt="Meal Mate Logo" className="logo-image" />
        Meal Mate
      </div>

      <div className="find_product">
        <input type="text" placeholder="Tìm kiếm" className="search-bar" />
      </div>

      <div className="menu">
        <div
          className="menu-item"
          onClick={handleFoodClick}
          style={{ cursor: "pointer" }}
        >
          <span>Sản phẩm</span>
        </div>

        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/Contactpage");
          }}
        >
          Liên Hệ
        </a>
      </div>

      {/* <div className="dropdown-item" onClick={handleCartClick}>
        <Badge count={cartItemCount} offset={[10, 0]}>
          <ShoppingCartOutlined
            style={{ fontSize: "35px", backgroundColor: "#d79875" }}
          />
        </Badge>
      </div> */}

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
              <div
                className="dropdown-item"
                onClick={() => navigate("/profile")}
              >
                Profile
              </div>
              <div className="dropdown-item" onClick={handleLogout}>
                Logout
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
