import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        // required:true,
    },
    mobile:{
        type:String,
        // unique:true,
    },
    role:{
        type:String,
        enum:['user','owner',"delivery"],
        required:true,
    },
    otp:{
        type:String,
        // automatically delete in 5 mins
        // expires:300,
        default:"123456"

    },
    isOtpVerified:{
        type:Boolean,
        default:false,
    },
    otpExpires:{
        type:Date,

    }
},{
    timestamps:true,
})

const userModel=mongoose.model('User',userSchema);
export default userModel;