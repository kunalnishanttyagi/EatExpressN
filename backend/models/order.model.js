import mongoose from 'mongoose';
const itemOrderSchema=new mongoose.Schema({
    item:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item',
    },
    quantity:{
        type:Number,
    },
    price:{
        type:Number,
    },name:{
        type:String,
    }
},{timestamps:true});
const shopOrderSchema=new mongoose.Schema({
    shop:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Shop',
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items:[itemOrderSchema],
    subTotal:{
        type:Number,
    },

    
},{timestamps:true});

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    totalAmount:{
        type:Number,
    },
    address:{
        text:String,
        latitude:Number,
        longitude:Number,
    },
    payment:{
        type:String,
        enum:['cod','online']
    },
    shopOrders:[shopOrderSchema],


},{timestamps:true});

const orderModel=mongoose.model('Order',orderSchema);
export default orderModel;