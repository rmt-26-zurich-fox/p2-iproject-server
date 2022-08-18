const express = require('express')
// const passport = require('passport')
// const Strategy = require('passport-discord/lib/strategy')
const productController = require('../controllers/productController')
const userController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')



const router = express.Router()


router.post('/admin/register', userController.adminRegister)
router.post('/admin/login', userController.adminLogin)
router.post('/cust/register', userController.registerCustomer )
router.post('/cust/login', userController.loginCustomer )
router.post('/cust/googleSignIn', userController.googleLoginCustomer)

// router.get('/api/auth/discord/', passport.authenticate('discord'))
// router.get('/api/auth/discord/redirect', passport.authenticate('discord'), (req,res)=>{
//     let {code} = req.query
//     console.log(code);
//     router.post('https://discord.com/api/oauth2/token', (req,res)=>{
//         const data={
//             'client_id' : process.env.DISCORD_CLIENT_ID,
//             'client_secret' : process.env.DISCORD_CLIENT_SECRET,
//             'grant_type': 'authorization_code',
//             'code' : code,
//             'redirect_uri': process.env.DISCORD_CLIENT_REDIRECT      
//         }
//         console.log(res);
//     })
    
// })
router.get('/products', productController.getProducts)
router.get('/products/:productId', productController.getOneProduct)

router.use(authentication)

router.post('/products/add',authorization, productController.createProduct)
router.get('/cart', productController.getCart)
router.delete('/cart', productController.emptyCart)
router.get('/cart/total', productController.getTotalPrice)
router.delete('/products/:productId/delete', authorization, productController.deleteProduct)
router.post('/cart/:productId', productController.addtoCart)
router.delete('/cart/:cartId', productController.deleteItemFromCart)



module.exports=router