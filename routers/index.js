const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter')
const productRouter = require('./productRouter');
const authentication = require('../middlewares/authentications');
const cartRouter = require('./cartRouter');
const transactionRouter = require('./transactionRouter');

router.use(userRouter)
router.use('/products', productRouter)
router.use(authentication)
router.use('/carts', cartRouter)
router.use('/transactions', transactionRouter)

module.exports = router;