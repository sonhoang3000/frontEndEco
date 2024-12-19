import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './UserManage.css';
const UserManage = () => {
	const [users, setUsers] = useState([]);
	const [formData, setFormData] = useState({
		id: "",
		email: "",
		name: "",
		password: "",
		phoneNumber: "",
	});
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const response = await axios.get("http://localhost:8080/api/get-all-users?id=ALL");
			setUsers(response.data.users);
		} catch (error) {
			toast.error("Lỗi khi lấy danh sách người dùng");
		}
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const validateForm = () => {
		const { email, name, password } = formData;
		if (!email || !name || !password) {
			toast.error("Vui lòng điền đủ thông tin");
			return false;
		}
		return true;
	};

	const handleAddUser = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		try {
			await axios.post("http://localhost:8080/api/create-new-user", formData);
			toast.success("Thêm người dùng thành công");
			setFormData({ email: "", name: "", password: "", phoneNumber: "" });
			fetchUsers();
		} catch (error) {
			toast.error("Lỗi khi thêm người dùng");
		}
	};

	const handleUpdateUser = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		try {
			await axios.put("http://localhost:8080/api/update-user", formData);
			toast.success("Cập nhật người dùng thành công");
			setFormData({ email: "", name: "", password: "", phoneNumber: "" });
			setIsEditing(false);
			fetchUsers();
		} catch (error) {
			toast.error("Lỗi khi cập nhật người dùng");
		}
	};

	const handleDeleteUser = async (userId) => {
		try {
			await axios.delete("http://localhost:8080/api/delete-user", {
				data: { id: userId },
			});
			toast.success("Xóa người dùng thành công");
			fetchUsers();
		} catch (error) {
			toast.error("Lỗi khi xóa người dùng");
		}
	};

	const handleEditUser = (user) => {
		setFormData({
			id: user._id,
			email: user.email,
			name: user.name,
			password: user.password,
			phoneNumber: user.phoneNumber,
		});
		setIsEditing(true);
	};

	return (
		<div className="user-manage-container">
			<div className="form-container">
				<h2>{isEditing ? "Cập nhật người dùng" : "Thêm người dùng"}</h2>
				<form
					onSubmit={isEditing ? handleUpdateUser : handleAddUser}
					className="user-form"
				>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
					/>
					<input
						type="text"
						name="name"
						placeholder="Tên người dùng"
						value={formData.name}
						onChange={handleChange}
					/>
					<input
						type="password"
						name="password"
						placeholder="Mật khẩu"
						value={formData.password}
						onChange={handleChange}
					/>
					<input
						type="text"
						name="phoneNumber"
						placeholder="Số điện thoại"
						value={formData.phoneNumber}
						onChange={handleChange}
					/>
					<div className="button-group">
						<button
							type="submit"
							className="update-button"
						>
							{isEditing ? "Cập nhật" : "Thêm mới"}
						</button>
						{isEditing && (
							<button
								type="button"
								className="delete-button"
								onClick={() => handleDeleteUser(formData.id)}
							>
								Xóa
							</button>
						)}
					</div>
				</form>
			</div>

			<div className="user-list">
				<h2>Danh sách người dùng</h2>
				<table>
					<thead>
						<tr>
							<th>Email</th>
							<th>Tên</th>
							<th>Số điện thoại</th>
							<th>Hành động</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user.email}</td>
								<td>{user.name}</td>
								<td>{user.phoneNumber}</td>
								<td>
									<div className="button-group">
										<button onClick={() => handleEditUser(user)}>Sửa</button>
										<button onClick={() => handleDeleteUser(user._id)}>Xóa</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>

	);
};

export default UserManage;
