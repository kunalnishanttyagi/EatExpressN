import express from 'express';
import {editItem} from '../controllers/item.controller.js';
const router=express.Router();
import isAuth from '../middlewares/isAuth.js';
import {addItem} from '../controllers/item.controller.js';
import {getItem} from '../controllers/item.controller.js';
import multer from 'multer';
import {deleteItem} from '../controllers/item.controller.js';
import { upload } from '../middlewares/multer.js';
router.post('/addItem',isAuth,upload.single('image'), addItem);
router.post('/editItem/:id',upload.single('image'), editItem);
router.post('/createitem',isAuth,upload.single('image'), addItem);
router.get('/getitem/:id',isAuth,getItem);
router.delete('/deleteitem',isAuth,deleteItem);


export default router;