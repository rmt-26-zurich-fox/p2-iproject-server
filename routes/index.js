const router = require('express').Router()
const { authentication } = require('../middlewares/auth')
const userRouter = require('./user-router')

router.use('/users', userRouter)

router.use(authentication)

module.exports = router