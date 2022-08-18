const router = require('express').Router()
const SearchLocationController = require('../controllers/searchlocationController')

router.post('/', SearchLocationController.readWeather)


module.exports = router