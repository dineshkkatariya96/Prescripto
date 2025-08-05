import express from 'express'
import cors from 'cors';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoutes.js';
import paypalRouter from './routes/paypal.js';

import dotenv from 'dotenv';
dotenv.config();
//app config
const app = express();
const port = process.env.SERVER_PORT || 3000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/admin',adminRouter)   //localhost: 4000/api/admin/add-doctor
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.use('/api/paypal',paypalRouter)

app.get('/',(req,res) => {
    res.send("API WORKING")
})

app.listen(port,() => {
    console.log(`server stated on ${port}`);
    
})