import express from 'express';

const router=express.Router();
import isAuth from '../middlewares/isAuth.js';
import {signup,login,logout,sendotpforpasswordreset,changepassword,verifyotp,googleAuth} from '../controllers/auth.controller.js';

router.post('/signup', signup);
router.post('/login',login);
router.post('/logout', logout);
router.post('/sendotpforpasswordreset',sendotpforpasswordreset);
router.post('/changepassword',changepassword);
router.post('/verifyotp',verifyotp);
router.post('/googleAuth',googleAuth);


export default router;