import { get } from 'mongoose';
import itemModel from '../models/item.model.js';
import shopModel from '../models/shop.model.js';
import userModel from '../models/user.model.js';
import uploadImage from '../utils/cloudinary.js';


export const addItem=async(req,res)=>{
    try{
        console.log("trying to add item");
        let photo;
        const {name,price,description,image,category,type}=req.body;
        console.log(name,price,description,image,category,type);
        if(req.file){
            photo=await uploadImage(req.file.path);
        }
        const shop=await shopModel.findOne({owner:req.userId});
        console.log(shop);
        if(!shop){
            return res.status(401).json({message:'Unauthorized shop not found'});
        }
        const item=await itemModel.create({
            name,
            price,
            description,
            shop:shop._id,
            image:photo,
            category,
            type
        });
        console.log(item);
        await shopModel.updateOne(
            { _id: shop._id },
            { $push: { items: item._id } }
            );
        // console.log(item);
        res.status(201).json({message:'Item created successfully',item:item,shop:shop});
    }
    catch(err){
        console.log("error in addItem controller",err);
        res.status(500).json({message:'Error occured',err:err.message});
    }
}

export const deleteItem=async(req,res)=>{
    try{
        const {itemId}=req.body;
        
        itemModel.findByIdAndDelete(itemId);
        // await item.remove();
        const shop=await shopModel.findOne({owner:req.userId});
        console.log(shop);
        shop.items=shop.items.filter(item=>item._id!=itemId);
        await shop.save();
        res.status(200).json({message:'Item deleted successfully',shop:shop});
    }
    catch(err){
        console.log("error in deleteItem controller",err);
        res.status(500).json({message:'Error occured',err:err.message});
    }
}
export const editItem=async(req,res)=>{
    try{
        // const itemId=req.body.itemId;
        
        const { id } = req.params;
        const {name,price,description,oldImage,category,type}=req.body;
        console.log(name,price,description,oldImage,category,type,id);
        let photo;
        if(req.file){
            photo=await uploadImage(req.file.path);
        }

        else photo=oldImage;
        const item=await itemModel.findById(id);
        if(photo===null) photo=item.image;
        if(!item){
            return res.status(401).json({message:'Unauthorized item not found'});
        }
        // if(item.shop.owner.toString()!==req.userId.toString()){
        //     return res.status(401).json({message:'Unauthorized owner not found'});
        // }
        const updatedItem=await itemModel.findByIdAndUpdate(id,{
            name,
            price,
            description,
            image:photo,
            category,
            type
        },{new:true});
        const shop=await shopModel.findOne({owner:req.userId}).populate('items');
        
        res.status(201).json({message:'Item updated successfully',item:updatedItem,shop:shop});
    }
    catch(err){
        console.log("error in editItem controller",err);
        res.status(500).json({message:'Error occured',err:err.message});
    }
}
export const getItem=async(req,res)=>{
    try{
        console.log("trying to get item");
        const { id } = req.params;
        console.log(id);
        const item=await itemModel.findById(id);
        console.log(item);
        res.status(200).json({message:'Item found successfully',item:item});
    }
    catch(err){
        console.log("error in getItem controller",err);
        res.status(500).json({message:'Error occured',err:err.message});
    }
}
export default {addItem,editItem,getItem,deleteItem};