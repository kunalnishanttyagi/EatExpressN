
import userModel from '../models/user.model.js';

export const getUser=async(req,res)=>{
    try{
        // console.log(req.userId);
        const user=await userModel.findById({_id:req.userId});
        // console.log(user);
        if(!user){
            return res.status(401).json({message:'Unauthorized user not found'});
        }
        // const user=await userModel.findById(req.userId);
        res.status(200).json({user:user});
    }catch(err){
        console.log("error in getUser controller",err);
        res.status(500).json({message:'Error occured while fetching user'});    

    }
}

export default {getUser};