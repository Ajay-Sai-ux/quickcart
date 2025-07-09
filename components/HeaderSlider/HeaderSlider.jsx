import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import styles from "./HeaderSlider.module.scss";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={styles.sliderWrapper}>
      <div
        className={styles.sliderContainer}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div key={slide.id} className={styles.slide}>
            <div className={styles.textContainer}>
              <p className={styles.offer}>{slide.offer}</p>
              <h1 className={styles.title}>{slide.title}</h1>
              <div className={styles.buttonGroup}>
                <button className={styles.btnPrimary}>{slide.buttonText1}</button>
                <button className={styles.btnSecondary}>
                  {slide.buttonText2}
                  <Image src={assets.arrow_icon} alt="arrow_icon" />
                </button>
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <Image src={slide.imgSrc} alt={`Slide ${index + 1}`} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`${styles.dot} ${currentSlide === index ? styles.active : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
