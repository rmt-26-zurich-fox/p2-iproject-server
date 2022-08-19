const router = require('express').Router()
const { authentication } = require('../middlewares/auth')
const { errorHandler } = require('../middlewares/error-handler')
const quoteRouter = require('./quote-router')
const userRouter = require('./user-router')
const favoriteRouter = require('./favorite-router')

router.use('/users', userRouter)

router.use('/quotes', quoteRouter)

router.use(authentication)
router.use('/favorites', favoriteRouter)

router.use(errorHandler)

module.exports = router