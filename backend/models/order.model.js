import mongoose from 'mongoose';
const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    totalAmount:{
        type:Number,
    },

},{timestamps:true});

const orderModel=mongoose.Model('Order',orderSchema);
export default orderModel;