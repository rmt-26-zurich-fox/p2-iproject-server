const express = require('express')
const passport = require('passport')
const productController = require('../controllers/productController')
const userController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


const router = express.Router()


router.post('/admin/register', userController.adminRegister)
router.post('/admin/login', userController.adminLogin)
router.post('/cust/register', userController.registerCustomer )
router.post('/cust/login', userController.loginCustomer )

router.get('/api/auth/discord/', passport.authenticate('discord'), (req,res)=>{
    res.status(200).json({message:"masuk get discord"})
})
router.get('/api/auth/discord/redirect', passport.authenticate('discord'), (req,res)=>{
    res.status(200).json({message:"masuk post discord"})
})

router.get('/products', productController.getProducts)
router.get('/products/:productId', productController.getOneProduct)


// router.use(authentication)
router.post('/products/add',authorization, productController.createProduct)
router.get('/cart', productController.getCart)
router.delete('/cart', productController.emptyCart)
router.get('/cart/total', productController.getTotalPrice)
router.delete('/products/:productId/delete', authorization, productController.deleteProduct)
router.post('/cart/:productId', productController.addtoCart)
router.delete('/cart/:cartId', productController.deleteItemFromCart)



module.exports=router