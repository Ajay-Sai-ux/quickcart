"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import ProductCard from "@/components/ProductCard/ProductCard";
import { assets } from "@/assets/assets";
import styles from "./Product.module.scss";

const Product = () => {
  const { id } = useParams();
  const router = useRouter();
  const { products, addToCart } = useAppContext();

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch single product from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Failed to fetch product:", error.message);
        return;
      }

      const formatted = {
        ...data,
        _id: data.id,
        image: data.image_urls,
        offerPrice: data.offer_price,
      };

      setProductData(formatted);
      setMainImage(formatted.image?.[0] || null);
      setLoading(false);
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading || !productData) return <Loading />;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.gridWrapper}>
          <div className="px-5 lg:px-16 xl:px-20">
            <div className={styles.imageMain}>
              <Image src={mainImage} alt="main" width={1280} height={720} />
            </div>
            <div className={styles.imageThumbnails}>
              {productData.image.map((img, i) => (
                <div
                  key={i}
                  className={styles.thumbnail}
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt={`thumb-${i}`}
                    width={1280}
                    height={720}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.productInfo}>
            <h1 className={styles.title}>{productData.name}</h1>
            <div className={styles.rating}>
              <div className={styles.stars}>
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <Image
                      key={i}
                      src={assets.star_icon}
                      alt="star"
                      width={16}
                      height={16}
                    />
                  ))}
                <Image
                  src={assets.star_dull_icon}
                  alt="star-dull"
                  width={16}
                  height={16}
                />
              </div>
              <p>(4.5)</p>
            </div>
            <p className={styles.description}>{productData.description}</p>
            <p className={styles.price}>
              ₹{productData.offerPrice}
              <span className={styles.original}>₹{productData.price}</span>
            </p>
            <hr />
            <table>
              <tbody>
                <tr>
                  <td className="label">Brand</td>
                  <td className="value">{productData.brand || "Generic"}</td>
                </tr>
                <tr>
                  <td className="label">Color</td>
                  <td className="value">{productData.color || "Multi"}</td>
                </tr>
                <tr>
                  <td className="label">Category</td>
                  <td className="value">{productData.category}</td>
                </tr>
              </tbody>
            </table>
            <div className={styles.actions}>
              <button
                className="addToCart"
                onClick={() => addToCart(productData.id)}
              >
                Add to Cart
              </button>
              <button
                className="buyNow"
                onClick={() => {
                  router.push("/cart");
                }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        <div className={styles.featured}>
          <p className={styles.heading}>
            Featured <span>Products</span>
          </p>
          <div className={styles.underline}></div>
          <div className={styles.productsGrid}>
            {products.slice(0, 5).map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
