import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (req, res) => {
  try {
    console.log("=== INCOMING REQUEST ===");
    console.log("Headers:", req.headers);
    console.log("Body:", JSON.stringify(req.body, null, 2));
    
    // The authUser middleware adds userId to req.body
    const { userId, items, amount, address, paymentMethod } = req.body;
    
    console.log("=== DESTRUCTURED VALUES ===");
    console.log("userId:", userId);
    console.log("paymentMethod:", paymentMethod);
    console.log("paymentMethod type:", typeof paymentMethod);
    console.log("paymentMethod length:", paymentMethod?.length);
    
    // Basic validations
    if (!userId) {
      console.log("❌ Missing userId");
      return res.json({ success: false, message: "User authentication required" });
    }
    
    if (!paymentMethod) {
      console.log("❌ Missing paymentMethod");
      return res.json({ success: false, message: "Payment method is required" });
    }
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log("❌ Invalid items");
      return res.json({ success: false, message: "Order items are required" });
    }
    
    if (!amount || !address) {
      console.log("❌ Missing amount or address");
      return res.json({ success: false, message: "Amount and address are required" });
    }
    
    // Validate payment method
    const allowedMethods = ['COD', 'BANK_TRANSFER'];
    if (!allowedMethods.includes(paymentMethod)) {
      console.log("❌ Invalid payment method:", paymentMethod);
      return res.json({ 
        success: false, 
        message: `Invalid payment method: ${paymentMethod}. Allowed: ${allowedMethods.join(', ')}` 
      });
    }
    
    console.log("✅ All validations passed");
    
    // Create order data with explicit types
    const orderData = {
      userId: String(userId),
      items: items,
      amount: Number(amount),
      address: String(address),
      paymentMethod: String(paymentMethod),
      payment: false,
      date: Date.now(),
      status: 'pending'
    };
    
    console.log("=== CREATING ORDER ===");
    console.log("Order data:", JSON.stringify(orderData, null, 2));
    
    // Create and save the order
    const newOrder = new orderModel(orderData);
    
    // Validate before saving
    const validationError = newOrder.validateSync();
    if (validationError) {
      console.log("❌ Validation error:", validationError);
      return res.json({ success: false, message: "Order validation failed: " + validationError.message });
    }
    
    const savedOrder = await newOrder.save();
    console.log("✅ Order saved successfully:", savedOrder._id);
    
    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    console.log("✅ Cart cleared");
    
    res.json({ 
      success: true, 
      message: "Order placed successfully",
      orderId: savedOrder._id 
    });
    
  } catch (error) {
    console.error("❌ BACKEND ERROR:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    
    if (error.name === 'ValidationError') {
      console.error("Validation details:", error.errors);
    }
    
    res.json({ 
      success: false, 
      message: `Order creation failed: ${error.message}` 
    });
  }
};

// Get all orders (Admin)
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.json({ success: false, message: error.message });
  }
};

// Get user orders
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.json({ success: false, message: error.message });
  }
};

// Update order status (Admin)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.json({ success: false, message: 'Invalid status' });
    }
    
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.json({ success: false, message: error.message });
  }
};

  const deleteOrder = async (req, res) => {
  try {
    console.log("=== DELETE ORDER REQUEST ===");
    console.log("Body:", req.body);

    const { orderId } = req.body;
    if (!orderId) {
      console.log("❌ Missing orderId");
      return res.status(400).json({ success: false, message: 'Order ID is required' });
    }

    const deleted = await orderModel.findByIdAndDelete(orderId);
    if (!deleted) {
      console.log("❌ Order not found:", orderId);
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    console.log("✅ Order deleted:", orderId);
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    console.error("❌ Error deleting order:", error);
    res.status(500).json({ success: false, message: 'Server error deleting order' });
  }
};


export { placeOrder, allOrders, userOrders, updateStatus, deleteOrder };