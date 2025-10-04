import mongoose from "mongoose";
const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    description:{
        type:String,
    },
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shop",
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:["Snacks","Main Course","Dessert","Side Dish","Burger","Pizza","Hot Pot","Ice Cream","Beverages"],
    },
    type:{
        type:String,
        enum:["Veg","Non-Veg"],
    }
},{timestamps:true});
const itemModel=mongoose.model("Item",itemSchema);
export default itemModel;