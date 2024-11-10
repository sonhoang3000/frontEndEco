import React from "react";
import img_sp from "../assets/img/hamburger.jpg";
import "../css/MainSection.css";
import ProductCard from "./ProductCard";

function MainSection() {
  return (
    <div className="main-section">
      <h>Món ăn ngon </h>
      <br></br>
      <h>không ngon không lấy tiền....</h>
      <div className="top-sellers">
        <h2>Top bán chạy</h2>
        <div className="product-list">
          <ProductCard
            img_sp={img_sp}
            name={"Crack Burgers"}
            rating={"4.5"}
            price={"8.888.888"}
          />
        </div>
      </div>

      <div className="offers">
        <h2>Ưu đãi</h2>
        <div className="product-list">
          <ProductCard
            img_sp={img_sp}
            name={"Crack Burgers"}
            rating={"4.5"}
            price={"8.888.888"}
          />
        </div>
      </div>
    </div>
  );
}

export default MainSection;
