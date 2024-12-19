import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Vendor.css';

const VendorManage = () => {
	const [vendors, setVendors] = useState([]);
	const [formData, setFormData] = useState({
		id: "",
		email: "",
		nameVendor: "",
		password: "",
		phoneNumber: "",
	});
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		fetchVendors();
	}, []);

	const fetchVendors = async () => {
		try {
			const response = await axios.get("http://localhost:8080/api/get-all-vendors?id=ALL");
			setVendors(response.data.vendors);
		} catch (error) {
			toast.error("Lỗi khi lấy danh sách nhà cung cấp");
		}
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const validateForm = () => {
		const { email, nameVendor, password } = formData;
		if (!email || !nameVendor || !password) {
			toast.error("Vui lòng điền đủ thông tin");
			return false;
		}
		return true;
	};

	const handleAddVendor = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		try {
			await axios.post("http://localhost:8080/api/create-new-vendor", formData);
			toast.success("Thêm nhà cung cấp thành công");
			setFormData({ email: "", nameVendor: "", password: "", phoneNumber: "" });
			fetchVendors();
		} catch (error) {
			toast.error("Lỗi khi thêm nhà cung cấp");
		}
	};

	return (
		<div className="vendor-manage-container">
			<div className="form-container">
				<h2>{isEditing ? "Cập nhật nhà cung cấp" : "Thêm nhà cung cấp"}</h2>
				<form
					onSubmit={isEditing ? handleAddVendor : handleAddVendor}
					className="vendor-form"
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
						name="nameVendor"
						placeholder="Tên nhà cung cấp"
						value={formData.nameVendor}
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
					</div>
				</form>
			</div>

			<div className="vendor-list">
				<h2>Danh sách nhà cung cấp</h2>
				<table>
					<thead>
						<tr>
							<th>Email</th>
							<th>Tên nhà cung cấp</th>
							<th>Số điện thoại</th>
						</tr>
					</thead>
					<tbody>
						{vendors.map((vendor) => (
							<tr key={vendor._id}>
								<td>{vendor.email}</td>
								<td>
									<Link to="/vendor-admin/home" className="vendor-name-link">
										{vendor.nameVendor}
									</Link>
								</td>
								<td>{vendor.phoneNumber}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default VendorManage;
