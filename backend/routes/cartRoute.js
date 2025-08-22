import express from 'express'
import { addToCart, getUserCart, updateCart, mergeGuestCart } from '../controlers/cartController.js'
import authUser from '../middleware/auth.js'

const cartRouter = express.Router()

cartRouter.post('/get', authUser, getUserCart)
cartRouter.post('/add', authUser, addToCart)
cartRouter.post('/update', authUser, updateCart)
cartRouter.post('/merge', authUser, mergeGuestCart) // New merge endpoint

export default cartRouter