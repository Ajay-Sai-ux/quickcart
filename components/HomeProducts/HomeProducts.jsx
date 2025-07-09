import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useAppContext } from "@/context/AppContext";
import styles from "./HomeProducts.module.scss";


const HomeProducts = () => {
  const { products, router } = useAppContext();

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Popular products</p>

      <div className={styles.gridWrapper}>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      <button
        onClick={() => {
          router.push("/all-products");
        }}
        className={styles.seeMoreBtn}
      >
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
