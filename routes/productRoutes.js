const express=require('express');
const {createproductController,getProductController,getsingleProductController,productPhotoController,deleteProductController,updateProductController,productFilterController,searchProductController,relatedProductController,productCategoryController,braintreeTokenController,braintreePaymentController}=require('../controllers/productController')
const { requireSignin, isAdmin } = require('../middlewares/authMiddleware');
const formidable = require('express-formidable');
const { productCountController } = require('../controllers/productController');
const { productListController } = require('../controllers/productController');

const router=express.Router();

//create-product
router.post('/create-product',requireSignin,isAdmin,formidable(),createproductController)
//update-category
router.put('/update-product/:pid',requireSignin,isAdmin,formidable(),updateProductController)
//get all product
router.get('/get-product',getProductController);
//single category
router.get('/get-product/:slug',getsingleProductController);
//get photo
router.get('/product-photo/:pid',productPhotoController)
//delete category
router.delete('/delete-product/:id',requireSignin,isAdmin,deleteProductController);
//filter
router.post('/product-filters',productFilterController);
//
router.get('/product-count',productCountController)
//
router.get('/product-list/:page',productListController)
//search 
router.get('/search/:keyword',searchProductController)
//related product
router.get('/related-product/:pid/:cid',relatedProductController)
//category product
router.get('/product-category/:slug',productCategoryController)
//payement integration
router.get('/braintree/token',braintreeTokenController)
//payements
router.post('/braintree/payment',requireSignin,braintreePaymentController)
module.exports = router;