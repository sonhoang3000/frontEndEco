import axios from 'axios'; // Import axios để sử dụng cho hàm fetch
import React, { useEffect, useState } from 'react';
import {
    deleteUserService,
    updateUser,
} from '../../services/userService';
import './UserProfile.css';

function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const userId = 1;

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/get-all-users?id=${userId}`);
      if (response.data && response.data.user) {
        setUser({
          name: response.data.user.name,
          email: response.data.user.email,
          password: '',
        });
      }
    } catch (error) {
      console.error('Lỗi khi lấy thông tin người dùng:', error);
    }
  };

  // Gọi hàm fetchUser khi component mount
  useEffect(() => {
    fetchUser();
  }, [userId]);

  // Hàm cập nhật thông tin người dùng
  const handleSave = async () => {
    try {
      const response = await updateUser(user);
      if (response.data.success) {
        alert('Thông tin đã được cập nhật!');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng:', error);
      alert('Cập nhật thông tin thất bại.');
    }
  };

  // Hàm xoá tài khoản người dùng
  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUserService(userId);
      if (response.data.success) {
        alert('Tài khoản đã bị xoá!');
        setUser({ name: '', email: '', password: '' }); // Xoá thông tin người dùng khỏi state
      }
    } catch (error) {
      console.error('Lỗi khi xoá tài khoản:', error);
      alert('Xoá tài khoản thất bại.');
    }
  };

  return (
    <div className="profile-container">
      {/* Tiêu đề và nút xoá tài khoản */}
      <div className="header">
        <h2>Thông tin người dùng</h2>
        <button className="delete-button" onClick={handleDeleteAccount}>
          Xoá tài khoản
        </button>
      </div>

      {/* Thay đổi thông tin */}
      <div className="info-section">
        <h3>Thay đổi thông tin</h3>
        <label>Tên</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Nhập tên"
        />
        <label>Email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Nhập email"
        />
        <label>Mật khẩu</label>
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Nhập mật khẩu"
        />
        <button className="save-button" onClick={handleSave}>
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
