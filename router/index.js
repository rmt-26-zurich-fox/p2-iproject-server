const router = require('express').Router()
const locationController = require('../controller/locationController')
const userController = require('../controller/userController')
const favoriteController = require('../controller/favoriteController')
const authentication = require('../middleware/authentication')

router.post('/register', userController.register)

router.post('/login', userController.login)

router.post('/googleg-sign-in', userController.googleSignIn)

router.get('/location', locationController.getLocation)

router.get('/location/:id', locationController.getLocationById)

router.use(authentication)

router.post('/favourite/:id', favoriteController.createFavourite)

router.get('/favourite', favoriteController.getFavourite)

router.delete('/favourite', favoriteController.deleteFavourite)



module.exports = router