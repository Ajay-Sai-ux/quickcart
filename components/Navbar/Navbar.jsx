"use client";
import React from "react";
import { assets, BagIcon, CartIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { isSeller,  user, router } = useAppContext();
  const { openSignIn } = useClerk();
  

  return (
    <nav className={styles.navbar}>
      <Image
        className={styles.logo}
        onClick={() => router.push("/")}
        src={assets.logo}
        alt="logo"
      />

      <div className={styles.navLinks}>
        <Link href="/">Home</Link>
        <Link href="/all-products">Shop</Link>
        <Link href="/">About Us</Link>
        <Link href="/">Contact</Link>
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className={styles.sellerButton}
          >
            Seller Dashboard
          </button>
        )}
      </div>

      <ul className={styles.icons}>
        {/* <Image
          className={styles.icon}
          src={assets.search_icon}
          alt="search icon"
        /> */}
        {user ? (
          <>
            <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action onClick={() => router.push('/cart')} label="Cart" labelIcon={<CartIcon />} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action onClick={() => router.push("/my-orders")} label="My Orders" labelIcon={<CartIcon />} />
              </UserButton.MenuItems>
            </UserButton>
          </>
          </>
        ) : (
          <button onClick={openSignIn} className={styles.account}>
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </ul>

      <div className={styles.mobileRight}>
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className={styles.sellerButton}
          >
            Seller Dashboard
          </button>
        )}
        {user ? (
          <>
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action onClick={() => router.push("/cart")} label="Cart" labelIcon={<CartIcon />} />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action onClick={() => router.push("/my-orders")} label="My Orders" labelIcon={<BagIcon />} />
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <button onClick={openSignIn} className={styles.account}>
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
