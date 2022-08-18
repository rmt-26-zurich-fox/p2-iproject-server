const UserController = require('../controllers/userController')
const router = require("express").Router()

router.post('/register', UserController.registerUser)

router.post('/login', UserController.loginUser)

router.post('/google-login', UserController.googleLogin)

module.exports = router