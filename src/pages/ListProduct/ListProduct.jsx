import { PlusOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getAllProductService } from "../../services/productService";
import "./ListProduct.css";

const ListProduct = () => {
  const [fetchProductData, setFetchProductData] = useState([]);
  // const [cartItemCount, setCartItemCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getAllProductService(selectedCategory); // Truyền selectedCategory vào API
        setFetchProductData(response.products);
      } catch (error) {
        console.log("fetch Product error", error);
      }
    };

    fetchProduct();
  }, [selectedCategory]); // Dữ liệu sẽ được tải lại khi selectedCategory thay đổi

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.id : null;

    if (userId) {
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      currentCart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
      });

      localStorage.setItem("cart", JSON.stringify(currentCart));
      // setCartItemCount(currentCart.length);
      alert(`${product.name} đã được thêm vào giỏ hàng của bạn!`);
    } else {
      alert("Please log in first!");
    }
  };

  const categories = [
    { id: "ALL", name: "Tất cả" },
    { id: "Đồ ăn", name: "Đồ ăn" },
    { id: "Thức uống", name: "Thức uống" },
    { id: "Bánh", name: "Bánh" },
    { id: "Fast Food", name: "Thức ăn nhanh" },
  ];

  return (
    <div className="product-page" style={{ display: "flex", marginTop: "70px" }}>
      <Navbar />

      {/* Sidebar */}
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        {fetchProductData && fetchProductData.length > 0 ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "white" }}>
              Sản phẩm
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
                padding: "20px",
              }}
            >
              {fetchProductData.map((item) => (
                <div
                  key={item._id || item.name}
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "186px",
                      height: "248px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: "10px 0" }}>{item.name}</h3>
                  <p style={{ color: "#555", fontSize: "14px" }}>{item.description}</p>
                  <p style={{ color: "#d9534f", fontSize: "16px", fontWeight: "bold" }}>Price: {item.price}</p>
                  <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                    <button
                      style={{
                        backgroundColor: "#d79875",
                        color: "white",
                        padding: "8px 12px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginTop: "10px",
                      }}
                    >
                      <Link
                        to={{
                          pathname: `/product/${item._id}`,
                          state: { product: item },
                        }}
                        className="product-link"
                      >
                        View Details
                      </Link>
                    </button>
                    <Tooltip title="Add to Cart">
                      <Button
                        icon={<PlusOutlined />}
                        style={{
                          backgroundColor: "#d79875",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          padding: "10px",
                        }}
                        onClick={() => handleAddToCart(item)}
                      />
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No products found for {selectedCategory} category.</p>
        )}
      </div>
    </div>
  );
};

export default ListProduct;  