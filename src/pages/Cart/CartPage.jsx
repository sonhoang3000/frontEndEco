import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./CartPage.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <Navbar />
      <div className="cart">
        <h1>Giỏ hàng của bạn</h1>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng trống</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h2>{item.name}</h2>
                  <p>Giá: ${item.price}</p>
                  <button onClick={() => handleRemoveItem(item.id)}>Xóa</button>
                </div>
              </div>
            ))}
            <button onClick={() => navigate("/checkout")}>Thanh toán</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
