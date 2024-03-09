const express=require('express');
const {createCategoryController,updateCategoryController,getCategoryController,getsingleCategoryController,deleteCategoryController}=require('../controllers/categoryController')
const { requireSignin, isAdmin } = require('../middlewares/authMiddleware');

const router=express.Router()
//create-category
router.post('/create-category',requireSignin,isAdmin,createCategoryController)
//update-category
router.put('/update-category/:id',requireSignin,isAdmin,updateCategoryController)
//get all category
router.get('/get-category',getCategoryController);
//single category
router.get('/single-category/:slug',getsingleCategoryController);
//delete category
router.delete('/delete-category/:id',requireSignin,isAdmin,deleteCategoryController);
module.exports = router;