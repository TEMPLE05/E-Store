// src/context/ShopContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  /* =======================
     Product & user-data fetchers
     ======================= */

  const getProductData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/products/list`);
      setProducts(res.data?.products || []);
    } catch (err) {
      console.error("getProductData:", err);
      toast.error("Failed to fetch products.");
    }
  };

  const getUserCart = async (authToken) => {
    if (!authToken) return;
    try {
      const res = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token: authToken } });
      if (res.data?.success) setCartItems(res.data.cartData || {});
    } catch (err) {
      console.error("getUserCart:", err);
      toast.error("Failed to fetch user cart.");
    }
  };

  const getUserOrders = async (authToken) => {
  if (!authToken) return; // Skip if user isn't logged in yet

  try {
    const res = await axios.get(`${backendUrl}/api/order/user`, {
      headers: { token: authToken },
    });

    if (res.data?.success) {
      setOrders(res.data.orders || []);
    } else {
      console.warn("getUserOrders: backend returned no success flag", res.data);
    }
  } catch (err) {
    console.error("getUserOrders:", err.message || err);

    // Only toast if we know the user is logged in and this isn't the first page load
    if (authToken && orders.length > 0) {
      toast.error("Failed to fetch user orders.");
    }
  }
};


  /* =======================
     Cart helpers
     ======================= */

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select product size");
      return;
    }

    const cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
      } catch (err) {
        console.error("addToCart:", err);
        toast.error("Failed to update cart on server.");
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
      } catch (err) {
        console.error("updateQuantity:", err);
        toast.error("Failed to update quantity on server.");
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const qty = cartItems[itemId][size] || 0;
        totalCount += qty;
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => p._id === itemId);
      if (!itemInfo) continue; // skip if product not loaded yet
      for (const size in cartItems[itemId]) {
        const qty = cartItems[itemId][size] || 0;
        if (qty > 0) totalAmount += itemInfo.price * qty;
      }
    }
    return totalAmount;
  };

  /* =======================
     Effects: load data & persist token
     ======================= */

  // 1) Load products on mount (public)
  useEffect(() => {
    getProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) When token exists (login or reload), load user-specific data
  useEffect(() => {
    if (token) {
      // run concurrently without blocking UI
      getUserCart(token);
      getUserOrders(token);
      // also refresh products to ensure current data after login
      getProductData();
    } else {
      // if logged out, clear user-specific states
      setCartItems({});
      setOrders([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // 3) Persist token when it changes
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  /* =======================
     Context value
     ======================= */

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    orders,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    // optional helpers you might want to call from components:
    getProductData,
    getUserCart,
    getUserOrders,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
