const jwt=require('jsonwebtoken');
const userModel  = require("../models/userModel");
const requireSignin=async(req,res,next)=>{
    try {
        const decode=jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET,{ expiresIn: '1h' });
            req.user=decode;
            next();
    } catch (error) {
        console.log(error);
    }
};
const isAdmin=async(req,res,next)=>{
    try {
        const user=await userModel.findById(req.user._id);
        if(user.role!==1){
            return res.status(401).send({
                success:false,
                message:'Unauthorised Access',
                error
            })
        }else{
        next();}
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            message:'ERROR IN ADMIN MIDDLEWARE',
        })
    }
}
module.exports={requireSignin,isAdmin};