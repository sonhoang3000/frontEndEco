import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchProductsService } from "../services/productService";
import Navbar from "../components/Navbar"; // Giả sử bạn có Navbar

function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { search } = useLocation(); // Lấy query từ URL
  const queryParams = new URLSearchParams(search);
  const searchQuery = queryParams.get("name");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      searchProductsService(searchQuery)
        .then((response) => {
          setProducts(response.data); // Lưu kết quả vào state
        })
        .catch((error) => {
          setError(error.message); // Lỗi khi gọi API
        })
        .finally(() => {
          setLoading(false); // Đảm bảo loading kết thúc
        });
    } else {
      setLoading(false);
    }
  }, [searchQuery]);useEffect(() => {
    if (searchQuery) {
      searchProductsService(searchQuery) // Gọi API với tên sản phẩm
        .then((response) => {
          setProducts(response.data); // Lưu kết quả vào state
        })
        .catch((error) => {
          setError(error.message); // Lỗi khi gọi API
        })
        .finally(() => {
          setLoading(false); // Đảm bảo loading kết thúc
        });
    } else {
      setLoading(false);
    }
  }, [searchQuery]);
  

  const handleViewProductDetail = (id) => {
    navigate(`/product-detail/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products found for '{searchQuery}'</div>;
  }

  return (
    <div className="product-list">
        {products.length === 0 ? (
            <p>No products found</p>
        ) : (
            products.map((product) => (
            <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p><strong>Giá:</strong> ${product.price}</p>
                <button onClick={() => handleViewProductDetail(product.id)}>
                Xem chi tiết
                </button>
            </div>
            ))
        )}
    </div>

  );
}

export default SearchResults;
