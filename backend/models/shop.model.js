import mongoose from "mongoose";
// import userModel from "./user.model";
// import itemModel from "./item.model";
const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    image:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },

    
    phone: {
        type: String,
        // required: true,
    },
    address: {
        type: String,
        required: true,
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item",
    }]

}, { timestamps: true });

const shopModel = mongoose.model("Shop", shopSchema);

export default shopModel;