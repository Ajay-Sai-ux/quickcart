"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@clerk/nextjs";

export const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = (props) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY || "₹";
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const { user, isLoaded } = useUser();

  // ✅ Fetch all products
  const fetchProductData = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formatted = data.map((item) => ({
        ...item,
        _id: item.id,
        image: item.image_urls,
        offerPrice: item.offer_price,
        price: item.price,
      }));

      setProducts(formatted);
    } catch (err) {
      console.error("Failed to fetch products from Supabase:", err.message);
    }
  };

  // ✅ Add item to cart
  const addToCart = async (productId) => {
    if (!isLoaded) return;

    if (!user) {
      alert("Please sign in to add items to cart.");
      return;
    }

    const userId = user.id;

    // Step 1: Check if cart exists
    let { data: cartData, error: cartError } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", userId)
      .single();

    // Step 2: If not, create a cart
    if (!cartData) {
      const { data: newCart, error: createError } = await supabase
        .from("carts")
        .insert({ user_id: userId })
        .select()
        .single();

      if (createError || !newCart) {
        console.error("Failed to create cart:", createError?.message);
        return;
      }

      cartData = newCart;
    }

    const cartId = cartData.id;

    // Step 3: Check if product already in cart
    const { data: existingItem } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("cart_id", cartId)
      .eq("product_id", productId)
      .single();

    // Step 4: Update or Insert
    if (existingItem) {
      await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("id", existingItem.id);
    } else {
      await supabase.from("cart_items").insert({
        cart_id: cartId,
        product_id: productId,
        quantity: 1,
      });
    }

    alert("Added to cart!");
    fetchCartItems(); // Refresh cart
  };

  // ✅ Fetch all items in cart
  const fetchCartItems = async () => {
    if (!isLoaded || !user) return;

    const userId = user.id;

    // Get cart
    const { data: cart, error: cartError } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (cartError || !cart) return;

    const cartId = cart.id;

    // Get cart items + product info
    const { data: items, error } = await supabase
      .from("cart_items")
      .select(
        `
        id,
        quantity,
        added_at,
        product:products (
          id,
          name,
          price,
          offer_price,
          image_urls
        )
      `
      )
      .eq("cart_id", cartId);

    if (error) {
      console.error("Failed to fetch cart items:", error.message);
      return;
    }

    setCartItems(items);
  };

  const updateCartQuantity = async (cartItemId, newQuantity) => {
  if (newQuantity <= 0) {
    // Remove item
    await supabase.from("cart_items").delete().eq("id", cartItemId);
  } else {
    // Update quantity
    await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", cartItemId);
  }
  fetchCartItems(); // Refresh cart
};

  useEffect(() => {
    fetchProductData();
    if (user && isLoaded) fetchCartItems();
  }, [user, isLoaded]);

  const value = {
    user,
    currency,
    router,
    products,
    cartItems,
    fetchProductData,
    fetchCartItems,
    addToCart,
    updateCartQuantity
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
