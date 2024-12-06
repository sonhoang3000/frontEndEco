import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProductService } from '../../src/services/productService'; 
import "../css/MainSection.css";
import Banner from './banner';

const MainSection = () => {

  const [fetchProductData, setFetchProductData] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getAllProductService("ALL");
        setFetchProductData(response.products);
      } catch (error) {
        console.log('fetch Product error', error);
      }
    };
    fetchProduct();
  }, []);

  return (
    <div className="main-section">
      <Banner />
      <div className="product-page">
        {fetchProductData && fetchProductData.length > 0 ? (
          <div className="TopSeller">
            <h1>Món ăn ngon</h1>
            <h2>không ngon không lấy tiền....</h2>
            <div className="grid-container">
              {fetchProductData.slice(0, 4).map((item) => (
                <div key={item.id || item.name} className="product-item">
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  {/* <p className="description">{item.description}</p> */}
                  <p className="price">Giá: {item.price}đ</p>
                  <button> 
                    <Link
                      to={{
                        pathname: `/product/${item._id}`,
                        state: { product: item },
                      }}
                      className="product-link">
                      Xem chi tiết
                    </Link>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>No products found.</p>
        )}

        {fetchProductData && fetchProductData.length > 0 ? (
          <div className="TopSeller">
            <h2>Đề xuất</h2>
            <div className="grid-container">
              {fetchProductData.slice(4, 8).map((item) => (
                <div key={item.id || item.name} className="product-item">
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  {/* <p className="description">{item.description}</p> */}
                  <p className="price">Giá {item.price}đ </p>
                  <button>
                    <Link
                      to={{
                        pathname: `/product/${item._id}`,
                        state: { product: item },
                      }}
                      className="product-link">
                      Xem chi tiết
                    </Link>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p style={{ textAlign: 'center' }}>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default MainSection;
