import express from 'express';
import { placeOrder,placeOrderRazorpay,placeOrderStripe, allOrders, userOrders, updateStatus } from '../controlers/orderControler.js';
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/auth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin features

orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// User features
orderRouter.post('/userOrders', userAuth, userOrders);

export default orderRouter;