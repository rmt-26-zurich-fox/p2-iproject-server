const router = require('express').Router()
const { authentication } = require('../middlewares/auth')
const quoteRouter = require('./quote-router')
const userRouter = require('./user-router')

router.use('/users', userRouter)
router.use('/quotes', quoteRouter)

router.use(authentication)

module.exports = router