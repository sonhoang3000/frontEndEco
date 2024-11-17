import React, { useEffect, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import CSS của Carousel
import "../css/MainSection.css";
import banner1 from "../assets/img/banner/banner1.png"; // Import hình ảnh
import banner2 from "../assets/img/banner/banner2.png";
import banner3 from "../assets/img/banner/banner3.png";

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    // Dữ liệu banner
    setBannerData([
      { id: 1, image: banner1,  description: "Mô tả banner 1" },
      { id: 2, image: banner2,  description: "Mô tả banner 2" },
      { id: 3, image: banner3,  description: "Mô tả banner 3" },
    ]);
  }, []);

  return (
    <div className="banner-container">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        interval={3000}
      >
        {bannerData.map((banner) => (
          <div key={banner.id}>
            <img src={banner.image} alt={banner.title} style={{ borderRadius: '10px' }} />
            {/* <div className="legend">
              <h3>{banner.title}</h3>
              <p>{banner.description}</p>
            </div> */}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
