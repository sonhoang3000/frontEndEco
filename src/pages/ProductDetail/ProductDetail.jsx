import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/get-all-product?id=${id}`
        );
        if (response.data.errCode === 0) {
          setProduct(response.data.products);
        } else {
          setError(response.data.errMessage || "Không có sản phẩm");
        }
      } catch (err) {
        setError("Lỗi khi tải chi tiết sản phẩm");
        console.error("API lỗi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  console.log("location", location);

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.id : null;
  
    if (userId) {
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      currentCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      localStorage.setItem("cart", JSON.stringify(currentCart));
      navigate("/cart");
    } else {
      navigate("/login", { state: location?.pathname });
    }
  };
  

  return (
    <>
      <Navbar /> 
      <div className="product-detail">
        {loading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
            <p>
              <strong>Nguyên liệu:</strong>{" "}
              {product.ingredients
                ? product.ingredients.join(", ")
                : "Không khả dụng"}
            </p>
            <p>
              <strong>Giá:</strong> ${product.price}
            </p>
            <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetail;