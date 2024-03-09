const { hashpassword, comparepassword } = require("../helpers/authHelper");
const userModel  = require("../models/userModel");
const jwt = require('jsonwebtoken');
const router = require("../routes/auth");
const orderModel = require("../models/orderModel");

const registerController=async(req,res)=>{
try {
    const {name,email,password,phone,address,answer}=req.body; 
    if(!name){
        return res.send({message:"Name is required"});
    }
    if(!email){
        return res.send({message:"Email is required"});
    }
    if(!password){
        return res.send({message:"Password is required"});
    }
    if(!phone){
        return res.send({message:"Phone no is required"});
    }
    if(!address){
        return res.send({message:"Address is required"});
    }
    if(!answer){
        return res.send({message:"Answer is required"});
    }

    //existing user
    const exisitingUser=await userModel.findOne({email});
    if(exisitingUser){
        return res.status(200).send({
            success:false,
            message:'Already Registered',
        })
    }
    //register user
    const hashedpassword=await hashpassword(password)
    const user=new userModel({name,email,password:hashedpassword,phone,address,answer}).save();

    res.status(201).send({
        success:true,
        message:"User Registered successfully",
        user:user
    })

} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in Registration",
        error
    })
}
}
const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        console.log("Running");
        if(!email||!password){
            return res.status(500).send({
                success:false,
                message:"Invailid UserDetails",
            })
        }
        const User=await userModel.findOne({email});
        if(!User){
            return res.status(404).send({
                success:false,
                message:'Email is not registered.',
            })
        }
        const match=await comparepassword(password,User.password);
        if (!match) {
    return res.status(401).json({
        success: false,
        message: "Incorrect details",
    });
}
        const token = jwt.sign({_id:User._id }, process.env.JWT_SECRET,{expiresIn:'7d'});
        
        res.status(200).send({
            success:true,
            message:"login successfully",
            User:{
                _id:User._id,
                name:User.name,
                email:User.email,
                phone:User.phone,
                address:User.address,
                role:User.role,
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Login",
            error
        })
    }
}
//function for forgot password
const forgotpasswordController=async(req,res)=>{
    try {
        const {email,answer,newpassword}=req.body;
    if(!email){
        res.status(400).send({message:"Email is required"});
    }
    if(!answer){
        res.status(400).send({message:"Answer is required"});
    }
    if(!newpassword){
        res.status(400).send({message:"Newpassword is required"});
    } 
    const user=await userModel.findOne({email,answer});
    if(!user){
        return res.status(404).send({
            success:false,
            message:"Wrong email or wrong answer",
        })
    }
    const hashed=await hashpassword(newpassword);
    await userModel.findByIdAndUpdate(user ._id,{password:hashed});
    return res.status(200).send({
        success:true,
        message:"Password updated succesfully",
    })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"something went wrong",
            error:error
        })
    }
   
}

const testController=async(req,res)=>{
    try {
        console.log("Protected route to get the user");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
    
}

const updateProfileController = async (req, res) => {
    try {
      const { name, email, address, phone } = req.body;
  
      // Retrieve the current user's details
      const user = await userModel.findById(req.user._id);
  
      // Update the user's information with the new values from the request body
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          email: email || user.email,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
  
      // Send a successful response with the updated user details
      res.status(200).send({
        success: true,
        message: "Profile updated successfully",
        updatedUser: updatedUser,
      });
    } catch (error) {
      console.log(error);
  
      // Send an error response with a 500 status
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error: error.message || "Internal Server Error",
      });
    }
  };
  
 const getOrderController=async(req,res)=>{
    try {
        const orders=await orderModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name");
        
        res.status(200).send({
            success: true,
            message: "Orders send successfully",
            orders:orders,
          });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong"
        })
    }
 }
 const getAllOrderController=async(req,res)=>{
    try {
        const orders=await orderModel.find({}).populate("products","-photo").populate("buyer","name").sort({createdAt:-1});
        
        res.status(200).send({
            success: true,
            message: "Orders send successfully",
            orders:orders,
          });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong"
        })
    }
 }
 const orderStatusController = async (req, res) => {
    try {
      const { status } = req.body;
      const { oid } = req.params;
  
      // Update the order status
      const updatedOrder = await orderModel.findByIdAndUpdate(
        oid,
        { status: status },
        { new: true }
      );
  
      // Check if the order exists
      if (!updatedOrder) {
        return res.status(404).json({
          success: false,
          message: 'Order not found',
        });
      }
  
      // Send a success response
      res.status(200).json({
        success: true,
        message: 'Order status updated successfully',
        orders: updatedOrder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
  };
  
 
module.exports = {
    registerController,
    loginController,
    testController, 
    forgotpasswordController,
    updateProfileController,
    getOrderController,
    getAllOrderController,orderStatusController
};

