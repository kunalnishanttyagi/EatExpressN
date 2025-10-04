import shopModel from '../models/shop.model.js';
import itemModel from '../models/item.model.js';
import userModel from '../models/user.model.js';
import uploadImage from '../utils/cloudinary.js';
import { get } from 'http';


export const createEditShop=async(req,res)=>{
    try{
        let imagee;
        console.log(req.body);
        const {name,city,state,address}=req.body;
        
        // const formData=req.body;
        
        if(req.file){
            imagee=await uploadImage(req.file.path)
        }
        console.log(imagee,name,city,state,address);
//         for (let [key, value] of formData.entries()) {
//   console.log(key, value);
// }
        // else console.log("no image");
        let shop=await shopModel.findOne({owner:req.userId});
        console.log("user id is ",req.userId);
        const user=await userModel.findOne({_id:req.userId})
        console.log(user.phone);
        console.log(user.fullName);
        console.log(user);

        const phonee=user.phone;
        console.log(shop);
        if(shop){
            shop=await shopModel.findOneAndUpdate({owner:req.userId},{
                name,
                city,
                state,
                phone:phonee,
                address,
                image:imagee,  
            },{new:true});
            res.status(201).json({message:'Shop updated successfully',shop:shop});
            return;
        }
        shop=await shopModel.create({
            name,
            city,
            state,
            phone:phonee,
            owner:req.userId,
            address,
            image:imagee,
        });
        console.log(newShop);
        res.status(201).json({message:'Shop created successfully',shop:shop});
    }
    catch(err){
        console.log("error in createShop controller",err);
        // console.log("error in createShop controller",err);
        res.status(500).json({message:'Error occured',err:err.message});
    }
}

export const getShop=async(req,res)=>{
    try{
        console.log("trying to get shop");  
        let shop=await shopModel.findOne({owner:req.userId}).populate('items');
        
        // console.log(shop);
        if(shop){
            // await shop.populate('Item')
            res.status(200).json({message:'Shop found successfully',shop:shop});
        }
        else{
            res.status(404).json({message:'Shop not found',shop:null});
        }
    }
    catch(err){
        console.log("error in getShop controller",err);
        res.status(500).json({message:'Error occured',err:err.message});
    }
}

export const getShops=async(req,res)=>{
    try{
        const {city}=req.params;
        console.log("trying to get shops");
        console.log(city);
        let shops=await shopModel.find({city:city}).populate('items');
        console.log("shops found are", shops);
        if(shops){
            // await shop.populate('Item')
            res.status(200).json({message:'Shops found successfully',shops:shops});
        }
        else{
            res.status(404).json({message:'Shops not found',shops:null});
        }
    }
    catch(err){
        console.log("error in getShops controller",err);
        res.status(500).json({message:'Error occured',err:err.message});
    }
}
    
// export const 





export default {createEditShop,getShop,getShops};