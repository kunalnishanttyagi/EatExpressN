import jwt from 'jsonwebtoken';
// import userModel from '../models/user.model';


const isAuth=async(req,res,next)=>{
    console.log("in isAuth middleware");
    try{
        // console.log(req.cookies);
        const token=req.cookies.token;
        console.log("token",token);
        if(!token){
            return res.status(401).json({message:'Unauthorized token not found'});
        }
        const decoded=await jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        // console.log(decoded.id);
        // const id=decoded._id;
        const userId=decoded.id;
        // console.log(id);
        // const user=await userModel.findById(userId);
        // if(!user){
        //     return res.status(401).json({message:'Unauthorized user not found'});
        // }
        req.userId=userId;
        console.log("userId",userId);
        next();
    }catch(err){
        console.log("error in isAuth middleware",err);
        res.status(500).json({message:'Error occured'});    

    }
}

export default isAuth;