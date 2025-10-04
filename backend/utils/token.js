import jwt from 'jsonwebtoken';
const generateToken=(userId)=>{
    const payload={
        id:userId
    }
    const options={
        expiresIn:'7d',
    }
    return jwt.sign(payload,process.env.JWT_SECRET,options);
}

export default generateToken;