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
    "http://localhost:5173",
    "http://localhost:5174",
    "https://e-store-29sw.vercel.app",  // frontend
    "https://e-store-2pkm.vercel.app"   // admin panel
];
connectDB()
connectCloudinary()

//MiddleWares
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    try {
      const hostname = new URL(origin).hostname;

      if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(hostname)) {
        return callback(null, true);
      }
    } catch (err) {
      console.warn("Invalid origin:", origin);
    }

    return callback(new Error("CORS policy: Origin not allowed"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
}));

// Explicitly handle OPTIONS
app.options("*", cors());


//Api Endpoints
app.use('/api/user',userRouter)
app.use('/api/products',productsRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>(
    res.send("API Working")
))

app.listen(port, ()=> console.log('Server started on port:'+port))
