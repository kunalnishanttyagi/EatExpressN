import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
const uploadImage=async(image)=>{
    cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});
    try{
        const result=await cloudinary.uploader
  .upload(image)
  // await fs.unlinkSync(image);
  console.log("image uploaded");
  console.log(result);
  return result.secure_url;
    }
    catch(error){
        fs.unlinkSync(image);
        console.log(error);
    }
}

export default uploadImage;
