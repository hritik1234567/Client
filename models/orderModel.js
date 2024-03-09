const mongoose = require('mongoose');

const orderSchema=new mongoose.Schema({
 products:[{
    type:mongoose.ObjectId,
    ref:'product'
 },],
 payment:{},
 buyer:{
    type:mongoose.ObjectId,
    ref:'user'
 },
 status:{
    type:String,
    default:"Not Process",
    enum:["Not Process","Processing","Shipped","Delivered","Cancelled"]
 }
  
},{timestamps:true })

const Order=mongoose.model('order',orderSchema);
module.exports=Order;      