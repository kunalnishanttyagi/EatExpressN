import express from 'express';

import { getUserOrders, placeOrder,getOwnerOders } from '../controllers/order.controller.js';
import isAuth from '../middlewares/isAuth.js';



const orderRoute=express.Router();
orderRoute.post("/placeorder",isAuth,placeOrder);
orderRoute.get("/userorders",isAuth,getUserOrders);
orderRoute.get("/ownerorders",isAuth,getOwnerOders);
export default orderRoute;