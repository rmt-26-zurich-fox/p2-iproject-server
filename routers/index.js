const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter')
const productRouter = require('./productRouter');
const authentication = require('../middlewares/authentications');
const cartRouter = require('./cartRouter');

router.use(userRouter)
router.use('/products', productRouter)
router.use(authentication)
router.use('/carts', cartRouter)

module.exports = router;