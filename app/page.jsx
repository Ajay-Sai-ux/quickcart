'use client'
import React from "react";
import HeaderSlider from "@/components/HeaderSlider/HeaderSlider";
import HomeProducts from "@/components/HomeProducts/HomeProducts";
import Banner from "@/components/Banner/Banner";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct/FeaturedProduct";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import styles from "./Home.module.scss";


const Home = () => {
  return (
    <>
      <Navbar />
      <div className={styles.pageWrapper}>
        <HeaderSlider className={styles.headerSlider} />
        <HomeProducts />
        <FeaturedProduct />
        <Banner />
        <NewsLetter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
