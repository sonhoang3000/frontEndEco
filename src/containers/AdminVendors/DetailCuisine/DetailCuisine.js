import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getAllProductService, updateSideDishProductService } from "../../../services/productService";
import { getAllSideDishService } from '../../../services/sideDishService';
import './DetailCuisine.css';
const ProductDetail = ({ product }) => (


  <div className="product-detail">
    <h1>{product[0]?.name}</h1>
    <img src={product[0]?.image} alt={product[0]?.name} />
    <div className="product-details">
      <p>{product[0]?.description}</p> {/* Mô tả sản phẩm */}
      <p><strong>Nguyên liệu:</strong> {product[0]?.ingredients ? "Có nguyên liệu" : "Không khả dụng"}</p>
      <p><strong>Giá:</strong> ${product[0]?.price}</p>
      <p><strong>Danh mục:</strong> {product[0]?.category}</p>
    </div>
  </div>
);

const SideDishesTable = ({ sideDishes, addSideDishToProduct, isActive }) => (
  <table className="admin-table">
    <thead>
      <tr>
        <th>STT</th>
        <th>Tên món ăn đi kèm</th>
        <th>Ảnh</th>
        <th>Giá</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {sideDishes.map((item, index) => (
        <tr key={item.id || index}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>
            <img src={item.image} alt={item.name} style={{ width: "100px", height: "auto" }} />
          </td>
          <td>{item.price}</td>
          <td>
            <button
              onClick={() => addSideDishToProduct(item)}
              className={isActive ? "active" : "unactive"}>
              {isActive ? "Active" : "Unactive"}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

function DetailCuisine() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [fetchSideDishes, setfetchSideDishes] = useState([]);
  const storedVendor = localStorage.getItem("dataVendor");
  const vendor = storedVendor ? JSON.parse(storedVendor) : null;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await getAllProductService(`${id}`);
        if (response.errCode === 0) {
          setProduct(response.products);
        } else {
          console.log(response.errMessage || "Không có sản phẩm");
        }
      } catch (err) {
        console.log("Lỗi khi tải chi tiết sản phẩm", err);
      }
    };

    const fetchAllSideDishes = async () => {
      try {
        if (!vendor) {
          console.error("Vendor not found in localStorage");
          return;
        }
        const response = await getAllSideDishService("ALL");
        if (response && response.sideDishes) {
          const filteredProducts = response.sideDishes.filter(
            (sideDish) => sideDish.vendorId === vendor.id
          );
          setfetchSideDishes(filteredProducts);
        }
      } catch (error) {
        console.log('fetch product error', error);
      }
    };

    fetchAllSideDishes();
    fetchProductDetail();
  }, [id, vendor]);

  const addSideDishToProduct = async (item) => {
    item.idProduct = id;
    const response = await updateSideDishProductService(item);
    console.log('check response', response);
  };

  return (
    <div className="detail-cuisine-container">
      <button onClick={() => navigate("/vendor-admin/cuisine")} className="back-button">
        Trở về trang Sản phẩm như cũ
      </button>

      <ProductDetail product={product} />
      <h2>Các món ăn đi kèm</h2>
      <SideDishesTable sideDishes={fetchSideDishes} addSideDishToProduct={addSideDishToProduct} isActive={isActive} />
    </div>
  );
}

export default DetailCuisine;
