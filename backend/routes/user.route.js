import express from 'express';
const router=express.Router();

import {getUser} from '../controllers/user.controller.js';
import isAuth from '../middlewares/isAuth.js';

router.get('/getcurrentuser',isAuth, getUser);

export default router;