const { getFood } = require('../controllers/food')
const router = require('express').Router()

// Food
router.get('/', getFood)

module.exports = router