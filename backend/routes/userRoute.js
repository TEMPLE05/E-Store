import express from 'express';
import { loginuser, registerUser, adminLogin, getProfile } from '../controlers/userControler.js';
import auth from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginuser);
userRouter.get('/profile', auth, getProfile);
userRouter.post('/admin', adminLogin);

export default userRouter;