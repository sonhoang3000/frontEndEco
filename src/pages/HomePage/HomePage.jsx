import React from "react";
import "../../css/App.css";

import Footer from "../../components/Footer";
import MainSection from "../../components/MainSection";
import Navbar from "../../components/Navbar";


function HomePage() {
  return (
    <div className="container">
      <Navbar />
      <main>
        <MainSection />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
