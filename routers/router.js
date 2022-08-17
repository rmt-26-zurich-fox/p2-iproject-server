const express = require('express')
const productController = require('../controllers/productController')
const userController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


const router = express.Router()


router.post('/admin/register', userController.adminRegister)
router.post('/admin/login', userController.adminLogin)
router.post('/cust/register', userController.registerCustomer )
router.post('/cust/login', userController.loginCustomer )
router.get('/products', productController.getProducts)
router.get('/products/:id', productController.getOneProduct)


router.use(authentication)
router.post('/products/add',authorization, productController.createProduct)
router.get('/cart', productController.getCart)
router.delete('/cart/', productController.emptyCart)
router.get('/cart/total', productController.getTotalPrice)
router.delete('/products/:productId/delete', authorization, productController.deleteProduct)
router.post('/cart/:productId', productController.addtoCart)
router.delete('/cart/:cartId', productController.deleteItemFromCart)



module.exports=router