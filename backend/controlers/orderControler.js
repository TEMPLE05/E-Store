import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing an order using COD method
const placeOrder = async (req, res) => {
    try {
        const {userId,items,amount,address} = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            PaymentMethod:"COD",
            Payment:false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true, message:"Order placed successfully",});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
        
        
    }

}

// placing an order using Stripe method
const placeOrderStripe = async (req, res) => {
    
}

// placing an order using Razorpay method
const placeOrderRazorpay = async (req, res) => {
    
}

// getting all orders for admin panel
const allOrders = async (req, res) => {
    
}

// getting all orders for user frontend 
const userOrders = async (req, res) => {
    
}

// update order status by admin
const updateStatus = async (req, res) => {

}


export {placeOrder,placeOrderRazorpay,placeOrderStripe, allOrders, userOrders, updateStatus};