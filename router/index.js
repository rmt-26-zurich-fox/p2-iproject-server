const router = require('express').Router()
const locationController = require('../controller/locationController')
const userController = require('../controller/userController')

router.get('/location', locationController.getLocation)

router.post('/register', userController.register)

router.post('/login', userController.login)

module.exports = router