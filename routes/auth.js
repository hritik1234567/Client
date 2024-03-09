const express=require('express')
const { registerController, loginController, testController,forgotpasswordController,updateProfileController,getOrderController,getAllOrderController,orderStatusController } = require('../controllers/authController');


const {requireSignin,isAdmin} = require('../middlewares/authMiddleware');

const router=express.Router()

router.post('/register',registerController);
router.post('/login',loginController);
router.get("/test",requireSignin,isAdmin,testController);

router.post('/forget-password',forgotpasswordController)
//protected route auth
router.get("/user-auth",requireSignin,(req,res)=>{
    res.status(200).send({ok:true});
})
//
router.get("/admin-auth",requireSignin,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})
//
router.put('/profile',requireSignin,updateProfileController);
//order get 
router.get('/orders',requireSignin,getOrderController);
//all-orders
router.get('/all-orders',requireSignin,isAdmin,getAllOrderController);
//changing status
router.put("/order-status/:oid",requireSignin,isAdmin,orderStatusController)
module.exports = router;