const router = require('express').Router()
const user = require('../routes/user')
const food = require('../routes/food')
const bmi = require('../routes/health')
// const { authentication } = require('../middleware/authentication')

//User
router.use('/users', user)

// Food
router.use('/foods', food)

// AKG
router.use('/health', bmi)

module.exports = router