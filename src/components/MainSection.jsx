import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProductService } from "../../src/services/productService";
import "../css/MainSection.css";
import Banner from "./banner";
import { getALlRating } from "../services/ratingService";

const MainSection = () => {
	const [fetchProductData, setFetchProductData] = useState([]);
	const [allRating, setAllRating] = useState([]);

	const banners = [
		"https://i.pinimg.com/736x/a8/26/fa/a826fac4a148fdfbede3f61e6d657a2c.jpg",
		"https://i.pinimg.com/736x/07/ab/b4/07abb4972e2427dfcee62b1ccca5bdbf.jpg",
		"https://i.pinimg.com/736x/f6/fc/12/f6fc126d6d49974460a6f3a51a2134c0.jpg",
		"https://i.pinimg.com/736x/1d/ca/e2/1dcae24d4745985753e71e2595f1d4a2.jpg",
		"https://i.pinimg.com/736x/bf/f6/32/bff63222d48e859aeda74f4405a04d39.jpg",
	];

	const randomBanner = banners[Math.floor(Math.random() * banners.length)];

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await getAllProductService("ALL");
				setFetchProductData(response.products);
			} catch (error) {
				console.log("fetch Product error", error);
			}
		};
		const fetchRating = async () => {
			try {
				const response = await getALlRating({ limit: 3 });
				if (response.errCode === 0) {
					setAllRating(response.data);
				}
			} catch (error) {
				console.log("fetch Product error", error);
			}
		};
		fetchProduct();
		fetchRating();
	}, []);

	return (
		<div className="main-section">
			<Banner />

			<div className="product-page">
				<h1>Món ăn ngon</h1>
				<div className="xmai">"Thức ăn không chỉ đơn thuần là nguồn cung cấp năng lượng cho cơ thể, mà còn là cầu nối văn hóa và cảm xúc giữa con người.
					Mỗi món ăn mang trong mình một câu chuyện riêng, từ quá trình chuẩn bị cho đến hương vị đặc trưng gợi nhớ những kỷ niệm thân quen.
					Thức ăn không chỉ nuôi sống, mà còn gắn kết con người lại gần nhau hơn qua từng bữa ăn."</div>
				<div className="product-grid">
					{fetchProductData.slice(0, 4).map((product) => (
						<div className="product-item" key={product._id || product.name}>
							<img src={product.image} alt={product.name} />
							<h3>{`${product.name}`}</h3>
							<div style={{ display: "flex", alignItems: "center" }}>
								{Array.from({
									length: product.ratingAverage > 0 ? product.ratingAverage : 5,
								}).map((_, index) => (
									<span key={index} className="rating-star">
										⭐
									</span>
								))}
								({product.ratingCount})
							</div>
							<p>Giá: {product.price}đ</p>
							<div className="actions">
								<Link
									to={{
										pathname: `/product/${product._id}`,
										state: { product },
									}}
									className="view-details-btn"
								>
									Xem chi tiết
								</Link>
							</div>
						</div>
					))}
				</div>

				<div className="new-banner">
					<img src={randomBanner} alt="Banner" />
				</div>
				<div className="xmai2"> Nổi Bật</div>
				<div className="product-grid">
					{fetchProductData.slice(4, 8).map((product) => (
						<div className="product-item" key={product._id || product.name}>
							<img src={product.image} alt={product.name} />
							<h3>{product.name}</h3>
							<div style={{ display: "flex", alignItems: "center" }}>
								{Array.from({
									length: product.ratingAverage > 0 ? product.ratingAverage : 5,
								}).map((_, index) => (
									<span key={index} className="rating-star">
										⭐
									</span>
								))}
								({product.ratingCount})
							</div>
							<p>Giá: {product.price}đ</p>
							<div className="actions">
								<Link
									to={{
										pathname: `/product/${product._id}`,
										state: { product },
									}}
									className="view-details-btn"
								>
									Xem chi tiết
								</Link>
							</div>
						</div>
					))}
				</div>
				<div className="reviews-section">
					<div className="xmai2">Đánh giá sản phẩm</div>
					<div className="reviews-grid">
						{allRating.length
							? allRating.map((rating) => (
								<div className="review-item">
									<div className="review-header">
										<span className="review-name">
											{rating?.userId?.name}
										</span>
										<span className="review-rating">
											{" "}
											{Array.from({
												length: rating.rating > 0 ? rating.rating : 5,
											}).map((_, index) => (
												<span key={index} className="rating-star">
													⭐
												</span>
											))}
										</span>
									</div>
									<p className="review-text">{rating.comment}</p>
								</div>
							))
							: null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MainSection;
