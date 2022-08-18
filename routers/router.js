const router = require('express').Router()
const userRouter = require('./user')
const popularLocationRouter = require('./popularLocation')
const savedLocationRouter = require('./savedLocation')
const ipLocationRouter = require('./ipLocation')
const searchLocationRouter = require('./searchLocation')
const { authentication } = require('../middlewares/authentication')

// User
router.use('/users', userRouter)

// IP Adress Location
router.use('/ip', ipLocationRouter)

// Search Location
router.use('/search', searchLocationRouter)

// Popular Location
router.use('/popular', popularLocationRouter)

// Middlewares
router.use(authentication)

// Saved Location
router.use('/saved', savedLocationRouter)

module.exports = router