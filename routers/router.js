const router = require('express').Router()
const userRouter = require('./user')
const popularLocationRouter = require('./popularLocation')
const savedLocationRouter = require('./savedLocation')
const { authentication } = require('../middlewares/authentication')

// User
router.use('/users', userRouter)

// Popular Location
router.use('/popular', popularLocationRouter)

// Saved Location
router.use('/saved', savedLocationRouter)

module.exports = router