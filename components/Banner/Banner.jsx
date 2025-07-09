import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import styles from "./Banner.module.scss";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <Image
        className={styles.jblImage}
        src={assets.jbl_soundbox_image}
        alt="jbl_soundbox_image"
      />
      <div className={styles.content}>
        <h2>Level Up Your Gaming Experience</h2>
        <p>
          From immersive sound to precise controls—everything you need to win
        </p>
        <button className={styles.button}>
          Buy now
          <Image
            src={assets.arrow_icon_white}
            alt="arrow_icon_white"
          />
        </button>
      </div>
      <Image
        className={styles.mdController}
        src={assets.md_controller_image}
        alt="md_controller_image"
      />
      <Image
        className={styles.smController}
        src={assets.sm_controller_image}
        alt="sm_controller_image"
      />
    </div>
  );
};

export default Banner;
