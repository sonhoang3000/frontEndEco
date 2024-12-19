import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Orders.css';

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [vendorIds, setVendorIds] = useState([]); 
  const [selectedVendorId, setSelectedVendorId] = useState("");

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/get-all-order?id=ALL');
        console.log("API Response:", response.data);
        if (response.data.errCode === 0) {
          setOrders(response.data.carts);
          setFilteredOrders(response.data.carts); 

          const vendorIds = [...new Set(response.data.carts.map(order => order.vendorId))];
          console.log("Vendor IDs:", vendorIds);
          setVendorIds(vendorIds); 
        } else {
          toast.error(response.data.errMessage);
        }
      } catch (error) {
        toast.error('Lỗi khi lấy danh sách đơn hàng!');
        console.error("Fetch orders error:", error);
      }
    };

    fetchAllOrders();
  }, []);

  const handleVendorChange = (e) => {
    const vendorId = e.target.value;
    setSelectedVendorId(vendorId);

    if (vendorId === "") {
      setFilteredOrders(orders); 
    } else {
      setFilteredOrders(orders.filter(order => order.vendorId === vendorId));
    }
  };

  return (
    <div>
      <h2>Tất cả đơn hàng</h2>
      <div className="vendor-filter">
        <label htmlFor="vendor-select">Chọn Vendor:</label>
        <select
          id="vendor-select"
          value={selectedVendorId}
          onChange={handleVendorChange}
        >
          <option value="">Tất cả Vendor</option>
          {vendorIds.map((vendorId) => (
            <option key={vendorId} value={vendorId}>
              {vendorId} 
            </option>
          ))}
        </select>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Order ID</th>
            <th>Vendor ID</th>
            <th>Products</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Date time</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order._id}</td>
                <td>{order.vendorId}</td>
                <td>
                  {order.products.map((product, i) => (
                    <div key={i} className="product-info">
                      <span>{product} (x{order.orderCount})</span>
                    </div>
                  ))}
                </td>
                <td>{order.method}</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>{order.address}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Không có đơn hàng nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllOrders;
