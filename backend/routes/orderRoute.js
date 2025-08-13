import express from 'express';
import { placeOrder, allOrders, userOrders, updateStatus, deleteOrder } from '../controlers/orderControler.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin features

orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);
orderRouter.post('/delete', adminAuth, deleteOrder);

// Payment features
orderRouter.post('/place', authUser, placeOrder);

// User features
orderRouter.post('/userOrders', authUser, userOrders);

export default orderRouter;