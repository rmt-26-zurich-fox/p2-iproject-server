const { postFav, getFav, deleteFav } = require('../controllers/favourite')
const { favouriteAuth } = require('../middleware/authorization')
const router = require('express').Router()

// Food
router.get('/', getFav)
router.post('/:foodId', postFav)
router.delete('/:favouriteId', favouriteAuth, deleteFav)

module.exports = router