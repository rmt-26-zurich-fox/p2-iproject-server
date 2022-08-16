const router = require('express').Router()
const userRouter = require('./user')
const popularLocationRouter = require('./popularLocation')
const savedLocationRouter = require('./savedLocation')

// User
router.use('/users', userRouter)

// Popular Location
router.use('/popular', popularLocationRouter)

// Middlewares

// Saved Location
router.use('/saved', savedLocationRouter)

module.exports = router