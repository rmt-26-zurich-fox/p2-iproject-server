const router = require('express').Router()
const PopularLocationController = require('../controllers/popularLocationController')

router.get('/', PopularLocationController.readPopularLocation)
router.get('/:popularId', PopularLocationController.readPopularWeatherById)


module.exports = router