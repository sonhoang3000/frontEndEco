import axios from 'axios';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import './OrderVendor.css';

function OrderVendor() {
      const [orders, setOrders] = useState([]);
      const [vendorId, setVendorId] = useState(null);

      useEffect(() => {
            const storedDataVendor = localStorage.getItem("dataVendor");
            if (storedDataVendor) {
                  const vendor = JSON.parse(storedDataVendor);
                  setVendorId(vendor.id);
            } else {
                  toast.error("Vui lòng đăng nhập lại");
            }
      }, []);

      useEffect(() => {
            const fetchOrders = async () => {
                  if (!vendorId) return;

                  try {
                        const response = await axios.get(`http://localhost:8080/api/vendor/${vendorId}`);
                        if (response.data.errCode === 0) {
                              setOrders(response.data.orders);
                        } else {
                              console.error(response.data.errMessage);
                        }
                  } catch (error) {
                        console.error("Error fetching orders:", error);
                  }
            };

            fetchOrders();
      }, [vendorId]);

      const exportToExcel = () => {
            const ws = XLSX.utils.json_to_sheet(orders.map(order => ({
                  "Order ID": order._id,
                  "Products": order.products.join(", "),
                  "Payment": order.method,
                  "Status": order.status,
                  "Date time": new Date(order.createdAt).toLocaleString(),
                  "Address": order.address,
            })));

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Orders");

            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const excelFile = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(excelFile, "orders.xlsx");
      };

      return (
            <>
                  <h2>Đơn đặt hàng</h2>
                  <button onClick={exportToExcel} className="export-button">Xuất Excel</button>
                  <table className="admin-table">
                        <thead>
                              <tr>
                                    <th>STT</th>
                                    <th>Order ID</th>
                                    <th>Products</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th>Date time</th>
                                    <th>Address</th>
                              </tr>
                        </thead>
                        <tbody>
                              {orders.length > 0 ? (
                                    orders.map((order, index) => (
                                          <tr key={order._id}>
                                                <td>{index + 1}</td>
                                                <td>{order._id}</td>
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
                                          <td colSpan="7">No orders found</td>
                                    </tr>
                              )}
                        </tbody>
                  </table>
            </>
      );
}

export default OrderVendor;
