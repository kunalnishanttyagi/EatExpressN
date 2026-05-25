import express from 'express';

import { placeOrder,getMyOrders,updateOrderStatus } from '../controllers/order.controller.js';
import isAuth from '../middlewares/isAuth.js';


const app=express();

app.use((req,res,next)=>{
    console.log("here i am in orderroute");
    next();
})
const orderRoute=express.Router();
orderRoute.post("/placeorder",isAuth,placeOrder);
orderRoute.get("/orders",isAuth,getMyOrders);
// orderRoute.get("/shoporders",isAuth,getOwnerOrders);

orderRoute.post("/update-status/:orderId/:shopId",isAuth,updateOrderStatus)
export default orderRoute;