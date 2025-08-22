import { json } from "express";
import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added To Cart" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update item quantity in cart
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;

      // Remove if quantity is 0
      if (quantity <= 0) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }

      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Cart Updated" });
    } else {
      res.status(400).json({ success: false, message: "Item not found in cart" });
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user cart
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};
    res.json({ success: true, cartData });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Merge guest cart with user cart after login
const mergeGuestCart = async (req, res) => {
  try {
    const { userId, guestCart } = req.body;

    if (!guestCart || Object.keys(guestCart).length === 0) {
      return res.json({ success: true, message: "No guest cart to merge" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) return res.status(404).json({ success: false, message: "User not found" });

    let userCartData = userData.cartData || {};

    // Merge logic: Add guest cart quantities to existing user cart
    for (const itemId in guestCart) {
      if (!userCartData[itemId]) {
        userCartData[itemId] = {};
      }
      
      for (const size in guestCart[itemId]) {
        const guestQty = guestCart[itemId][size] || 0;
        if (guestQty > 0) {
          if (userCartData[itemId][size]) {
            // Add to existing quantity
            userCartData[itemId][size] += guestQty;
          } else {
            // Set new quantity
            userCartData[itemId][size] = guestQty;
          }
        }
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData: userCartData });
    res.json({ 
      success: true, 
      message: "Guest cart merged successfully", 
      cartData: userCartData 
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart, mergeGuestCart };
