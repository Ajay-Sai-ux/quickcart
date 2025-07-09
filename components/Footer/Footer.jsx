import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.logoSection}>
          <Image src={assets.logo} alt="logo" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className={styles.companyLinks}>
          <div>
            <h2>Company</h2>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.contactInfo}>
          <div>
            <h2>Get in touch</h2>
            <div className="info">
              <p>7550142217</p>
              <p>contact@ajaysai.me</p>
            </div>
          </div>
        </div>
      </div>

      <p className={styles.bottomText}>
        Copyright 2025 © Ajaysai.me, All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
