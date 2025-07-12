import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import styles from "./HeaderSlider.module.scss";

const HeaderSlider = () => {
  return (
    <div className={styles.sliderWrapper}>
      <Image
        className={styles.sliderImage}
        src={assets.banner}
        alt="header_slider_image"
      />
    </div>
  );
};

export default HeaderSlider;
