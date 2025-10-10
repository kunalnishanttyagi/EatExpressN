import express from 'express';

import { getUserOrders, placeOrder,getOwnerOrders } from '../controllers/order.controller.js';
import isAuth from '../middlewares/isAuth.js';



const orderRoute=express.Router();
orderRoute.post("/placeorder",isAuth,placeOrder);
orderRoute.get("/userorders",isAuth,getUserOrders);
orderRoute.get("/shoporders",isAuth,getOwnerOrders);
export default orderRoute;