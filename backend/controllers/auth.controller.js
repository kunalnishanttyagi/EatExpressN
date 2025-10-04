// here i will make a controller for authentication
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/token.js';
// import { use } from 'react';
import { sendMail } from '../utils/mail.js';

export const signup=async(req,res)=>{
    try{
        const {fullName,email,password,mobile,role}=req.body;

        const user=await userModel.findOne({email});

        if(user){
            return res.status(400).json({message:'Email already exists'});
        }
        if(password.length<4){
            return res.status(400).json({message:'Password should be atleast 6 characters'});
        }
        if(mobile.length<10){
            return res.status(400).json({message:'Invalid mobile number'});
        }
        const ssalt=process.env.SALT;
        // conver ssalt to number
        const salt= parseInt(ssalt);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=await userModel.create({
            fullName,
            email,
            password:hashedPassword,
            mobile,
            role,
        });
        // await newUser.save();
        const token=generateToken(newUser._id);
        res.cookie("token", token, {
    httpOnly: false,  // JS can read
    secure: false,    // localhost
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
  console.log(token)
        res.status(201).json({message:'User created successfully',user:newUser});
    }catch(err){
        console.log("error while signup ",err);
    }
    


}

export const logout=async(req,res)=>{
    console.log("trying to logout in backend")
    try{
        console.log("trying to logout in backend")
        // res.clearCookie('token');
        res.cookie("token", "token", {
    httpOnly: false,  // JS can read
    secure: false,    // localhost
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
    console.log("token after deleting", res.cookies);
        console.log("cookie cleared")
        console.log(req.cookies); // printing empty eror
        req.userId=null;
        req.user=null;
        res.status(200).json({message:'User logged out successfully'});
    }catch(err){
        console.log("error while logout ",err);
    }
}


export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(email,password);

        const user=await userModel.findOne({email});
        console.log(user);
        if(!user){
            return res.status(400).json({message:'user does not exists'});

        }
        console.log(user);
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message:'Invalid password'});
        }
        // await newUser.save();
        const token=generateToken(user._id);
        console.log(token)
       res.cookie("token", token, {
    httpOnly: false,  // JS can read
    secure: false,    // localhost
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
        res.status(201).json({message:'User login successfully',user:user});
    }catch(err){
        console.log("sign in error " ,err);
    }
    


}



export const sendotpforpasswordreset=async(req,res)=>{
    try{
        const {email}=req.body;
        const user=await userModel.findOne({email});
        if(!user){  
            return res.status(400).json({message:'user does not exists'});
        }
        
        console.log(user.otp);
        const otpp=Math.floor(100000 + Math.random() * 900000).toString();
        console.log(otpp);
        user.otp=otpp;
        user.otpExpires=new Date(Date.now()+300000);
        user.isOtpVerified=false;
        await user.save();
        console.log(user);
        await sendMail(user.email,otpp);
        res.status(201).json({message:'OTP sent successfully',user:user,otp:otpp});
    }catch(err){
        console.log("send otp  in error " ,err);
        res.status(500).json({message:'Error occured'});
    }    
}
export const verifyotp=async(req,res)=>{
    try{
        const {email,otp}=req.body;
        const user=await userModel.findOne({email:email});
        if(!user || user.otp!=otp || user.otpExpires<Date.now()){
            return res.status(404).json({message:' Invalid OTP'});
        }
        if(user.otp!==otp){
            return res.status(401).json({message:'Invalid OTP'});
        }
        user.isOtpVerified=true;
        user.otp=null;
        await user.save();
        res.status(200).json({message:'OTP verified successfully'});
    }catch(err){
        console.log("verify otp error " ,err);
    }    
}
export const changepassword=async(req,res)=>{
    try{
        // i am saying if old password is not provided then it will be empty
        // if old password is provided then it will be old password
        const {email,password}=req.body;
        // const {oldPassword?oldPassword:'',newPassword}=req.body;
        
        const user=await userModel.findOne({email:email});
        if(!user || user.isOtpVerified!==true){
            return res.status(404).json({message:'New password cannot be changed'});
        }
        const ssalt=process.env.SALT;
        // conver ssalt to number
        const salt= parseInt(ssalt);
        const hashedPassword=await bcrypt.hash(password,salt);
        user.password=hashedPassword;
        user.isOtpVerified=false;
        await user.save();
        res.status(200).json({message:'Password changed successfully',email:email});
    }catch(err){
        console.log("change password error " ,err);
    }    
}
export const googleAuth=async(req,res)=>{
    try{
        const {email,fullName,role,phone}=req.body;
        console.log(email,fullName,role,phone);
        let user=await userModel.findOne({email:email});
        if(!user){
            // create a new user
            user=await userModel.create({
                fullName,
                email,
                role,phone
            });
        };
        console.log(user);
        const token=generateToken(user._id);
        res.cookie("token",token,{
            httpOnly: false,  // JS can read
            secure: false,    // localhost
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })
        console.log(token);
        return res.status(201).json({message:'User created successfully',user:user,token:token});
        
    }
    catch(err){
        return res.status(500).json({message:"Error occured",err:err.message});
    }
}

// export default {signup,login,logout};
export default {signup,login,logout,verifyotp,changepassword,sendotpforpasswordreset,googleAuth};