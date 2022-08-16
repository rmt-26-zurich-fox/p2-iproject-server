const router = require('express').Router()
const { authentication } = require('../middlewares/auth')
const { errorHandler } = require('../middlewares/error-handler')
const quoteRouter = require('./quote-router')
const userRouter = require('./user-router')

router.use('/users', userRouter)
router.use(authentication)

router.use('/quotes', quoteRouter)

router.use(errorHandler)

module.exports = router