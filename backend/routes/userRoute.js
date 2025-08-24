import express from 'express';
import { loginuser, registerUser, adminLogin, getProfile,updateProfile,getUserOrders } from '../controlers/userControler.js';
import auth from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginuser);
userRouter.get('/profile', auth, getProfile);
userRouter.put('/profile', auth, updateProfile);
userRouter.get('/orders', auth, getUserOrders);
userRouter.post('/admin', adminLogin);

export default userRouter;