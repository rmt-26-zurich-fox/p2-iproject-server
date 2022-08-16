const router = require('express').Router()
const IPLocationController = require('../controllers/iplocationController')

router.get('/', IPLocationController.readWeather)


module.exports = router