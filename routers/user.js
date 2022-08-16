const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.createUsers)
router.post('/login', UserController.loginUsers)
router.post('/googleSignIn', UserController.googleSignIn)

module.exports = router