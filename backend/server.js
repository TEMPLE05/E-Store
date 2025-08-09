import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productsRouter from './routes/productsRoute.js'
import cartRouter from './routes/cartRoute.js'

//App Config
const app= express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//MiddleWares
app.use(express.json())
app.use(cors())

//Api Endpoints
app.use('/api/user',userRouter)
app.use('/api/products',productsRouter)
app.use('/api/cart',cartRouter)

app.get('/',(req,res)=>(
    res.send("API Working")
))

app.listen(port, ()=> console.log('Server started on port:'+port))
