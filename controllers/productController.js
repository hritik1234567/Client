const productModel=require('../models/productModel');
const categoryModel=require('../models/categoryModel')
const fs=require('fs');
const slugify=require('slugify');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const braintree = require("braintree");
const orderModel = require('../models/orderModel');
dotenv.config();

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });
  
const createproductController=async(req,res)=>{

try {
    const {name,slug,description,price,category,quantity,shipping}=req.fields;
    const {photo}=req.files;

    switch (true) {
        case !name:
            return res.status(401).send({success:false, error:"Name is required"}) 
        case !description:
            return res.status(401).send({success:false, error:"Description is required"}) 
        case !price:
            return res.status(401).send({success:false, error:"Price is required"})
        case !category:
            return res.status(401).send({success:false, error:"Category is required"})
        case !quantity:
            return res.status(401).send({success:false, error:"Quantity is required"})
        case photo &&photo.size> 1000000:
            return res.status(401).send({success:false, error:"Photo is large in size"})
    }
const products=await productModel({...req.fields,slug:slugify(name)})
if(photo){
    products.photo.data=fs.readFileSync(photo.path);
    products.photo.contentType=photo.type;
}
await products.save();
return res.status(200).send({
    success:true,
    message:"Category Already exists",
    product:products
    
}) 

} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        error,
        message:'Error in product-controller',
    });
}
}
const getProductController=async(req,res)=>{
    try {
        const products=await productModel.find({}).select("-photo").populate("category").limit(12).sort({createdAt:-1}) ;
        return res.status(200).send({
            success:true,
            message:"product get listed",
            totalcount:products.length,
            products:products,
        }) 

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error:error.message,
            message:'Error in getting products',
        });
    }
}

const getsingleProductController=async(req,res)=>{
    try {
        
        const product=await productModel.findOne({slug:req.params.slug}).select("-photo").populate("category");
        return res.status(200).send({
            success:true,
            message:"Single Product listed",
            product:product
        }) 
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in getting single product',
        });
    }
}
const productPhotoController = async (req, res) => {
    try {
        const productId = req.params.pid;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ success: false, message: 'Invalid product ID' });
        }

        const product = await productModel.findById(productId).select('photo');

        if (product && product.photo && product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        } else {
            return res.status(404).send({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in getting image',
        });
    }
};
const deleteProductController=async(req,res)=>{
    try {
        const {id}=req.params;
        await productModel.findByIdAndDelete(id).select("-photo");
        return res.status(200).send({
          success:true,
          message:"Single Product deleted",
          
      }) 
        
  } catch (error) {
      console.log(error);
      res.status(500).send({
          success:false,
          error,
          message:'Error in deletig product',
      });
  }
}
const updateProductController=async(req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping}=req.fields;
        const {photo}=req.files;
    
        switch (true) {
            case !name:
                return res.status(401).send({success:false, error:"Name is required"}) 
            case !description:
                return res.status(401).send({success:false, error:"Description is required"}) 
            case !price:
                return res.status(401).send({success:false, error:"Price is required"})
            case !category:
                return res.status(401).send({success:false, error:"Category is required"})
            case !quantity:
                return res.status(401).send({success:false, error:"Quantity is required"})
            case photo &&photo.size> 100000:
                return res.status(401).send({success:false, error:"Photo is large in size"})
        }
    const products=await productModel.findByIdAndUpdate(req.params.pid,{...req.fields,slug:slugify(name)},{new:true});
    if(photo){
        products.photo.data=fs.readFileSync(photo.path);
        products.photo.contentType=photo.type;
    }
    await products.save();
    return res.status(200).send({
        success:true,
        message:"Category Already exists",
        product:products
        
    }) 
    
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in product-update-controller',
        });}
}
    /*const productFilterController=async(req,res)=>{
        try {
            const [checked,radio]=req.body;
            let args={}
            if(checked.length>0){
                args.category=checked;
            }
            if(radio.length){
                args.price={$gte:radio[0],$lte:radio[1]};
            }
            const products=await productModel.find(args);
            return res.status(200).send({
                success:true,
                message:"Filtered products is now available",
                products:products
                
            }) 
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success:false,
                error,
                message:'Error in product-filter-controller',
            });
        }
    }*/
    const productFilterController = async (req, res) => {
        try {
          const { checked, radio } = req.body;
          let args = {};
      
          if (checked.length > 0) {
            args.category = checked;
          }
      
          if (radio.length) {
            args.price = { $gte: radio[0], $lte: radio[1] };
          }
      
          const products = await productModel.find(args);
      
          return res.status(200).send({
            success: true,
            message: "Filtered products are now available",
            products: products,
          });
        } catch (error) {
          console.error(error);
          res.status(500).send({
            success: false,
            error: error.message || "Internal Server Error",
            message: "Error in product-filter-controller",
          });
        }
      };
      const productCountController = async (req, res) => {
        try {
         const count=await productModel.find({}).estimatedDocumentCount();
      
          return res.status(200).send({
            success: true,
            message: "Count done",
            count:count,
          });
        } catch (error) {
          console.error(error);
          res.status(500).send({
            success: false,
            error: error.message || "Internal Server Error",
            message: "Error in product-filter-controller",
          });
        }
      };
      const productListController = async (req, res) => {
        try {
          const perPage = 6;
          const page = req.params.page || 1; // Use optional chaining to default to 1 if not provided
          const products = await productModel
            .find({})
            .select('-photo')
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
      
          return res.status(200).send({
            success: true,
            message: "Page list done",
            products: products,
          });
        } catch (error) {
          console.error(error);
          res.status(500).send({
            success: false,
            error: error.message || "Internal Server Error",
            message: "Error in product-filter-controller",
          });
        }
      };

      //
const searchProductController=async(req,res)=>{
   try {
    const {keyword}=req.params;
    const results=await productModel.find({
        $or:[
            {name:{$regex:keyword,$options:"i"}},
            {description:{$regex:keyword,$options:"i"}}
        ]
    }).select("-photo");
    res.json(results);
   } catch (error) {
    console.log(error);
    res.status(400).send({
        success: false,
        error: error.message || "Internal Server Error",
        message: "Error in product-filter-controller",
      });
   }

}
const relatedProductController=async(req,res)=>{
    try {
        const {pid,cid}=req.params;
        const products=await productModel.find({category:cid,_id:{$ne:pid}}).select('-photo').populate("category")
        return res.status(200).send({
            success: true,
            message: "Similar products found",
            products:products,
          });
    } catch (error) {
        console.log(error);
    res.status(400).send({
        success: false,
        error: error.message || "Internal Server Error",
        message: "Error in product-related-controller",
      });
    }
}
const productCategoryController=async(req,res)=>{
    try {
        const category=await categoryModel.findOne({slug:req.params.slug})
        const products=await productModel.find({category}).populate('category');
        return res.status(200).send({
            success: true,
            message: "Category wise product found",
            products:products,
            category:category,
          });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error: error.message || "Internal Server Error",
            message: "Error in product-related-controller",
          });
    }
}
const braintreeTokenController=async(req,res)=>{
    try {
        gateway.clientToken.generate({},function(err,response){
            if(err){
                res.status(500).send(err);
            }
            else{
                res.send(response);
            }
        })
    } catch (error) {
        console.log(error)
    }
    
}
const braintreePaymentController = async (req, res) => {
    try {
      const {cart, nonce} = req.body;
      let total = 0;
  
      cart.map((item) => {
        total += item.price;
      });
  
      gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        async function (error, result) {
          try {
            if (result) {
              const order = new orderModel({
                products: cart,
                payment: result,
                buyer: req.user._id,
              });
  
              await order.save();
  
              res.json({ ok: true });
            } else {
              res.status(500).send(error);
            }
          } catch (error) {
            console.error(error);
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  };
  

  
module.exports = {
createproductController,getProductController,getsingleProductController,productPhotoController,deleteProductController,updateProductController,productFilterController,productCountController,productListController,searchProductController,relatedProductController,productCategoryController,braintreeTokenController,braintreePaymentController
};