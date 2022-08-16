const router = require('express').Router()
const PopularLocationController = require('../controllers/popularLocationController')

router.get('/', PopularLocationController.readPopularLocation)
router.get('/:id', PopularLocationController.readPopularLocationById)

module.exports = router