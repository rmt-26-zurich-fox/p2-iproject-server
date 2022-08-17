const { postFav, getFav } = require('../controllers/favourite')
const router = require('express').Router()

// Food
router.get('/', getFav)
router.post('/:foodId', postFav)

module.exports = router