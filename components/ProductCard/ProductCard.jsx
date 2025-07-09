"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {
  const { currency, router } = useAppContext();

  return (
    <div
      onClick={() => {
        router.push("/product/" + product._id);
        scrollTo(0, 0);
      }}
      className={styles.card}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={product.image[0]}
          alt={product.name}
          className={styles.productImage}
          width={800}
          height={800}
        />
        {/* <button className={styles.heartBtn}>
          <Image src={assets.heart_icon} alt="heart_icon" />
        </button> */}
      </div>

      <p className={styles.name}>{product.name}</p>
      <p className={styles.description}>{product.description}</p>

      <div className={styles.rating}>
        <p className={styles.ratingText}>4.5</p>
        <div className={styles.ratingStars}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              src={
                index < Math.floor(4) ? assets.star_icon : assets.star_dull_icon
              }
              alt="star_icon"
            />
          ))}
        </div>
      </div>

      <div className={styles.bottomRow}>
        <p className={styles.price}>
          {currency}
          {product.offerPrice}
        </p>
        <button className={styles.buyBtn}>Buy now</button>
      </div>
    </div>
  );
};

export default ProductCard;
