import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import styles from "./FeaturedProduct.module.scss";

const products = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    title: "Unparalleled Sound",
    description: "Experience crystal-clear audio with premium headphones.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
];

const FeaturedProduct = () => {
  return (
    <div className={styles.section}>
      <div className={styles.heading}>
        <p className={styles.title}>Featured Products</p>
        <div className={styles.underline}></div>
      </div>

      <div className={styles.grid}>
        {products.map(({ id, image, title, description }) => (
          <div key={id} className={styles.card}>
            <Image
              src={image}
              alt={title}
              className={styles.productImage}
            />
            <div className={styles.info}>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
              <button className={styles.button}>
                Buy now <Image src={assets.redirect_icon} alt="Redirect Icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
