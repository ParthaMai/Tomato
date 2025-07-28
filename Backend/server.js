import express from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";




//app config
const app= express()
const port= process.env.PORT || 4000

//middleware
app.use(express.json());
app.use(cors()) // using this we can access backend from frontend

 
//db connection
connectDB();

// api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads')); // accessing the image

// this is for user authentication api endpoints
app.use("/api/user",userRouter);
// For cart
app.use("/api/cart",cartRouter);
// For placeOrder
app.use("/api/order",orderRouter);


app.get("/",(req,res)=>{
    res.send("ApI Working")
})

app.listen(port,()=>{
    console.log(`Server Starteed on http://localhost:${port}`)
})

