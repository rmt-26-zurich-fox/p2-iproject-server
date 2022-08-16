const router = require('express').Router()
const SearchLocationController = require('../controllers/searchlocationController')

router.get('/', SearchLocationController.readWeather)


module.exports = router