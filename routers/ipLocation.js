const router = require('express').Router()
const IPLocationController = require('../controllers/')

router.get('/', IPLocationController.readWeather)


module.exports = router