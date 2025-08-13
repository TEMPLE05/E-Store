import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productsRouter from './routes/productsRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

//App Config
const app= express()
const port = process.env.PORT || 4000
const allowedOrigins = [
    "http://localhost:5173", // for local dev
    "https://e-store-29sw-git-main-otemple712-5983s-projects.vercel.app" // your Vercel frontend
    // Add your custom domain here later
];
connectDB()
connectCloudinary()

//MiddleWares
app.use(express.json());
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

//Api Endpoints
app.use('/api/user',userRouter)
app.use('/api/products',productsRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>(
    res.send("API Working")
))

app.listen(port, ()=> console.log('Server started on port:'+port))
