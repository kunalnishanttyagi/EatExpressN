import express from 'express';

const router=express.Router();
import isAuth from '../middlewares/isAuth.js';
import {getShops} from '../controllers/shop.controller.js';
// import {signup,login,logout,sendotpforpasswordreset,changepassword,verifyotp,googleAuth} from '../controllers/auth.controller.js';
import {createEditShop,getShop} from '../controllers/shop.controller.js';
import multer from 'multer';
import { upload } from '../middlewares/multer.js';
router.post('/createEditShop',isAuth,upload.single('image'), createEditShop);
router.get('/getshop',isAuth,getShop);
router.get('/getshops/:city',isAuth,getShops);
// router.post('/login',login);
// router.post('/logout', logout);
// router.post('/sendotpforpasswordreset',sendotpforpasswordreset);
// router.post('/changepassword',changepassword);
// router.post('/verifyotp',verifyotp);
// router.post('/googleAuth',googleAuth);


export default router;