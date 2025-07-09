'use client';
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // ✅ import supabase client
import { useUser } from "@clerk/nextjs";


export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "₹";
  const router = useRouter();

  const {user} = useUser();

  const [products, setProducts] = useState([]);
  // const [isSeller, setIsSeller] = useState(true);
  // const [userData, setUserData] = useState(false);
  // const [cartItems, setCartItems] = useState({});

  

  // ✅ Updated: Fetch product data from Supabase
  const fetchProductData = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Format for ProductCard component
      const formatted = data.map((item) => ({
        ...item,
        _id: item.id, // match frontend code
        image: item.image_urls,
        offerPrice: item.offer_price,
        price: item.price,
      }));

      setProducts(formatted);
    } catch (err) {
      console.error("Failed to fetch products from Supabase:", err.message);
    }
  };
  

  // const addToCart = async (itemId) => {
  //   const cartData = structuredClone(cartItems);
  //   cartData[itemId] = (cartData[itemId] || 0) + 1;
  //   setCartItems(cartData);
  // };

  // const updateCartQuantity = async (itemId, quantity) => {
  //   const cartData = structuredClone(cartItems);
  //   if (quantity === 0) delete cartData[itemId];
  //   else cartData[itemId] = quantity;
  //   setCartItems(cartData);
  // };

  // const getCartCount = () =>
  //   Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  // const getCartAmount = () => {
  //   let total = 0;
  //   for (const itemId in cartItems) {
  //     const product = products.find((p) => p._id == itemId);
  //     if (product) {
  //       total += product.offerPrice * cartItems[itemId];
  //     }
  //   }
  //   return Math.floor(total * 100) / 100;
  // };

  useEffect(() => {
    fetchProductData();
  }, []);

  const value = {
    user,
    currency,
    router,
    products,
    fetchProductData,
    // isSeller,
    // setIsSeller,
    // cartItems,
    // setCartItems,
    // addToCart,
    // updateCartQuantity,
    // getCartCount,
    // getCartAmount,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
