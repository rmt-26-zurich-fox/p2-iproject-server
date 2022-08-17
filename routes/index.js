const router = require('express').Router()
const user = require('../routes/user')
const food = require('../routes/food')
const bmi = require('../routes/health')
const favourite = require('../routes/favourite')
const { authentication } = require('../middleware/authentication')
// const { authentication } = require('../middleware/authentication')

//User
router.use('/users', user)

// Food
router.use('/foods', food)

// AKG
router.use('/health', bmi)

// Favourites
router.use('/favourites', authentication, favourite)

module.exports = router