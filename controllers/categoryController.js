const categoryModel=require('../models/categoryModel');
const slugify=require('slugify');
const createCategoryController=async(req,res)=>{

try {
    const {name}=req.body;
    if(!name){
        return res.status(401).send({
            success:false,
            message:"Name is required",
        }) 
    }
    const existingcategory=await categoryModel.findOne({name});
    if(existingcategory){
        return res.status(200).send({
            success:true,
            message:"Category Already exists",
            
        }) 
    }
    const category=await new categoryModel({name,slug:slugify(name)}).save();
    return res.status(200).send({
        success:true,
        message:"New Category Created",
        category
    }) 


} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:'Error in category-controller',
    });
}
}
const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;

        const category=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        return res.status(200).send({
            success:true,
            message:"Category Updated",
            category
        }) 
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in category-controller',
        });
    }

}
const getCategoryController=async(req,res)=>{
    try {
        const category=await categoryModel.find({});
        return res.status(200).send({
            success:true,
            message:"Category listed",
            category:category
        }) 

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in getting category',
        });
    }
}
const getsingleCategoryController=async(req,res)=>{
    try {
        const {slug}=req.params;
        const category=await categoryModel.findOne({slug:req.params.slug});
        return res.status(200).send({
            success:true,
            message:"Single Category listed",
            category:category
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in getting single category',
        });
    }
}
const deleteCategoryController=async(req,res)=>{
    try {
          const {id}=req.params;
          await categoryModel.findByIdAndDelete(id);
          return res.status(200).send({
            success:true,
            message:"Single Category deleted",
            
        }) 
          
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in deletig category',
        });
    }
}
module.exports = {
createCategoryController,updateCategoryController,getCategoryController,getsingleCategoryController,deleteCategoryController
};