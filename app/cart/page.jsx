"use client";
import React, { useEffect } from "react";
import { assets } from "@/assets/assets";
import OrderSummary from "@/components/OrderSummary";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import { useAppContext } from "@/context/AppContext";
import styles from "./Cart.module.scss";

const Cart = () => {
  const {
    cartItems,
    addToCart,
    fetchCartItems,
    updateCartQuantity, // will be added in context
    router,
    currency,
  } = useAppContext();

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.cartContainer}>
        <div className="flex-1">
          <div className={styles.cartHeader}>
            <p className={styles.title}>
              Your <span className={styles.highlight}>Cart</span>
            </p>
            <p className={styles.itemCount}>{cartItems.length} Items</p>
          </div>

          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Product Details</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  const product = item.product;
                  if (!product) return null;

                  return (
                    <tr key={item.id}>
                      <td className={styles.productInfo}>
                        <div>
                          <div className={styles.imageWrapper}>
                            <Image
                              src={product.image_urls[0]}
                              alt={product.name}
                              width={1280}
                              height={720}
                            />
                          </div>
                          <button
                            className={styles.removeBtnMobile}
                            onClick={() => updateCartQuantity(item.id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                        <div className={styles.details}>
                          <p>{product.name}</p>
                          <button
                            className={styles.removeBtn}
                            onClick={() => updateCartQuantity(item.id, 0)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                      <td className={styles.price}>
                        {currency}
                        {product.offer_price ?? product.price}
                      </td>
                      <td>
                        <div className={styles.quantityControl}>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Image src={assets.decrease_arrow} alt="-" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateCartQuantity(
                                item.id,
                                Number(e.target.value)
                              )
                            }
                          />
                          <button onClick={() => addToCart(product.id)}>
                            <Image src={assets.increase_arrow} alt="+" />
                          </button>
                        </div>
                      </td>
                      <td className={styles.subtotal}>
                        {currency}
                        {(
                          (product.offer_price ?? product.price) * item.quantity
                        ).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => router.push("/all-products")}
            className={styles.continueShopping}
          >
            <Image src={assets.arrow_right_icon_colored} alt="arrow" />
            Continue Shopping
          </button>
        </div>
        {/* <OrderSummary /> */}
      </div>
    </>
  );
};

export default Cart;
