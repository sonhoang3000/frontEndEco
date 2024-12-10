import { PlusOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { getAllProductService } from "../../services/productService";
import "./ListProduct.css";
import { getAllCart } from "../../services/productService";
import { createNewCart } from "../../services/cartService";
import { toast } from "react-toastify";

const ListProduct = () => {
	const [fetchProductData, setFetchProductData] = useState([]);

	const [getAllCategory, setGetAllCategory] = useState({});

	const [selectedCategory, setSelectedCategory] = useState("ALL");

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await getAllProductService("ALL");
				console.log('check response', response.products)

				const categories = response.products.map(product => product.category);
				const uniqueCategories = [...new Set(categories)];
				setGetAllCategory(uniqueCategories);

				setFetchProductData(response.products);
			} catch (error) {
				console.log("fetch Product error", error);
			}
		};

		fetchProduct();
	}, []);

	const handleAddToCart = async (product) => {
		const user = JSON.parse(localStorage.getItem("user"));
		const userId = user ? user.id : null;

		console.log('check userId', userId)

		if (!userId) {
			toast.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng");
			return;
		}

		const response = await getAllCart();

		const userCarts = response.carts.filter(
			(cart) => cart.idUser === user.id
		);
		const currentCart = Array.isArray(userCarts) ? userCarts : []; // Đảm bảo currentCart là một mảng

		console.log('check currentCart', currentCart)

		const productExists = currentCart.some((item) => item.nameProduct === product.name);

		if (productExists) {
			toast.warning("Sản phẩm đã có trong giỏ hàng");
			return;
		}

		try {
			const res = await createNewCart({
				idUser: userId,
				imageProduct: product.image,
				nameProduct: product.name,
				priceProduct: product.price,
				vendorId: product.vendorId
			});
			if (res.errCode === 0) {
				toast.success(res.message);
			}
		} catch (error) {
			toast.error("Có lỗi xảy ra");
		}
	};

	// Lọc sản phẩm dựa trên category được chọn
	const filteredProducts = selectedCategory === "ALL"
		? fetchProductData
		: fetchProductData.filter((item) => item.category === selectedCategory);

	return (
		<div className="product-page">
			<Navbar />
			<Sidebar
				getAllCategory={getAllCategory}
				setSelectedCategory={setSelectedCategory} // Truyền hàm để cập nhật category
			/>
			<div style={{ flex: 1 }}>
				{filteredProducts && filteredProducts.length > 0 ? (
					<div>
						<h2>Sản phẩm</h2>
						<div className="product-grid">
							{filteredProducts.map((item) => (
								<div className="product-card" key={item._id || item.name}>
									<img src={item.image} alt={item.name} />
									<h3>{item.name}</h3>
									<p>{item.description}</p>
									<p className="price">Price: {item.price}</p>
									<div className="actions">
										<Link to={{ pathname: `/product/${item._id}` }} className="view-details-btn">
											View Details
										</Link>
										<Tooltip title="Add to Cart">
											<Button
												icon={<PlusOutlined />}
												className="add-to-cart-btn"
												onClick={() => handleAddToCart(item)}
											/>
										</Tooltip>
									</div>
								</div>
							))}
						</div>
					</div>
				) : (
					<p style={{ textAlign: "center" }}>No products found for category.</p>
				)}
			</div>
		</div>
	);
};

export default ListProduct;
