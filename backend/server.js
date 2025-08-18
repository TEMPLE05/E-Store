import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productsRouter from './routes/productsRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000

// Allowed origins (Frontend + Admin)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://e-store-29sw.vercel.app",  // frontend
  "https://e-store-2pkm.vercel.app"   // admin panel
]

connectDB()
connectCloudinary()

// Middlewares
app.use(express.json())

// CORS config
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
}

app.use(cors(corsOptions))
app.options("*", cors(corsOptions)) // Preflight

// API Endpoints
app.use('/api/user', userRouter)
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
  res.send("API Working")
})

app.listen(port, () => console.log('Server started on port: ' + port))
