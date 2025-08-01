import express from 'express';
import { loginuser,registerUser,adminLogin } from '../controlers/userControler.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginuser)
userRouter.post('/admin',adminLogin)

export default userRouter;