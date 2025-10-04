// here i will make a database connection
import mongoose from 'mongoose';

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL,{
            // useNewUrlParser:true,
            // useUnifiedTopology:true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch(err){
        console.log(err);   
    }
}

export default connectDB;