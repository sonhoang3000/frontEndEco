import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './HomeAdmin.css';

function AdminDashboard() {
      const [cuisineCount, setCuisineCount] = useState(0);
      const [userCount, setUserCount] = useState(0);
      const [orderCount, setOrderCount] = useState(0);

      useEffect(() => {
            const fetchData = async () => {
                  try {
                        const [cuisineRes, userRes, orderRes] = await Promise.all([
                              axios.get("http://localhost:8080/api/count-products"),
                              axios.get("http://localhost:8080/api/count-users"),
                              axios.get("http://localhost:8080/api/admin/order-count"),
                        ]);

                        setCuisineCount(cuisineRes.data.count);
                        setUserCount(userRes.data.count);
                        setOrderCount(orderRes.data.count);
                  } catch (error) {
                        toast.error("Lỗi khi lấy dữ liệu");
                        console.error("Fetch error:", error);
                  }
            };

            fetchData();
      }, []);

      return (
            <div className="admin-dashboard-container">
                  <h2>Dashboard Quản Trị</h2>
                  <div className="stats-container">
                        <div className="stat-card">
                              <h3>Tổng Món Ăn</h3>
                              <p>{cuisineCount}</p>
                        </div>
                        <div className="stat-card">
                              <h3>Tổng Người Dùng</h3>
                              <p>{userCount}</p>
                        </div>
                        <div className="stat-card">
                              <h3>Tổng Đơn Hàng</h3>
                              <p>{orderCount}</p>
                        </div>
                  </div>
            </div>
      );
}

export default AdminDashboard;
