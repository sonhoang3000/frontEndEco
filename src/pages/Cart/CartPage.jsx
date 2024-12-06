import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./CartPage.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  console.log(cartItems);
  

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = savedCart.map((item) => ({
      ...item,
      quantity: item.quantity ? item.quantity : 1,
    }));
    setCartItems(updatedCart);
  }, []);

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Tăng số lượng sản phẩm
  const handleIncreaseQuantity = (id) => {
    console.log('updating: ' +id);
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  // Giảm số lượng sản phẩm
  const handleDecreaseQuantity = (id) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  // Xóa sản phẩm
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== id);
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  return (
    <>
      <Navbar />
      <div className="cart">
        <h1>Giỏ hàng của bạn</h1>
        {cartItems.length === 0 ? (
          <p style={{color:"orange"}} >Giỏ hàng trống</p>
        ) : (
          <div>
            {cartItems.map((item) => (
            
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h2>{item.name}</h2>
                  <p>Giá: ${item.price}</p>
                 
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                  </div>
                  <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>Xóa</button>
                </div>
              </div>
            ))}
            <button className="checkout-button" onClick={() => navigate("/checkout")}>
              Thanh toán
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;