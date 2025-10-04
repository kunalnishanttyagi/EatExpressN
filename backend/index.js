import express from 'express';
import connectDB from "./db/db.js";
import cookieParser from 'cookie-parser';
const app = express();
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import cors from 'cors';
import isAuth from './middlewares/isAuth.js';
import itemRoute from './routes/item.route.js';
import dotenv from 'dotenv';
import shopRoute from './routes/shop.route.js';
dotenv.config();

const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send('API is running....');
});

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

// app.use(cors(),{
//     origin:"https://eat-express.vercel.app",
//     credentials:true,
// });

// convert json data to object to access in req.body 
app.use(express.json());

app.use(cookieParser());
// app.use("console.log")
app.use((req,res,next)=>{
    console.log("here i am in backend");
    next();
})
app.use("/api/auth",authRoute);
app.use("/api/user", userRoute);
app.use("/api/shop",shopRoute);
app.use("/api/item",itemRoute);


app.listen(port,()=>{
    
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
})