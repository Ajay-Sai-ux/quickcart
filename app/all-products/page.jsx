'use client';
import ProductCard from "@/components/ProductCard/ProductCard";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useAppContext } from "@/context/AppContext";
import styles from "./AllProducts.module.scss";

const AllProducts = () => {
  const { products } = useAppContext();

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <p>All products</p>
          <div className={styles.underline}></div>
        </div>
        <div className={styles.productGrid}>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
