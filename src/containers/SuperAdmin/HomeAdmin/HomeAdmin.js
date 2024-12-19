import axios from "axios";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'; // Cần khai báo các thành phần của Chart.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './HomeAdmin.css';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function AdminDashboard() {
  const [productCount, setCuisineCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, userRes, productRes] = await Promise.all([
          axios.get("http://localhost:8080/api/count-orders"),
          axios.get("http://localhost:8080/api/count-users"),
          axios.get("http://localhost:8080/api/count-products"),
        ]);

        console.log("Order Response:", orderRes.data);
        console.log("User Response:", userRes.data);
        console.log("Product Response:", productRes.data);

        setOrderCount(orderRes.data.count || 0);
        setUserCount(userRes.data.count || 0);
        setCuisineCount(productRes.data.totalCount.count || 0);
      } catch (error) {
        toast.error("Lỗi khi lấy dữ liệu từ server");
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const handleProductClick = () => {
    navigate("/super-admin/cuisines");
  };

  const handleUserClick = () => {
    navigate("/super-admin/users");
  };

  const handleOrderClick = () => {
    navigate("/super-admin/orders");
  };

  const chartData = {
    labels: ['Tổng Sản Phẩm', 'Tổng Người Dùng', 'Tổng Đơn Hàng'],
    datasets: [
      {
        label: 'Số lượng',
        data: [productCount, userCount, orderCount],
        backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(255,159,64,0.2)', 'rgba(153,102,255,0.2)'],
        borderColor: ['rgb(35, 212, 65)', 'rgb(209, 209, 72)', 'rgb(237, 34, 37)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Dashboard Quản Trị</h2>
      <div className="stats-container">
        <div className="stat-card" onClick={handleProductClick}>
          <h3>Tổng Món Ăn</h3>
          <p>{productCount}</p>
        </div>
        <div className="stat-card" onClick={handleUserClick}>
          <h3>Tổng Người Dùng</h3>
          <p>{userCount}</p>
        </div>
        <div className="stat-card" onClick={handleOrderClick}>
          <h3>Tổng Đơn Hàng</h3>
          <p>{orderCount}</p>
        </div>
      </div>

      <div className="chart-container">
        <h3>Biểu đồ thống kê</h3>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default AdminDashboard; 