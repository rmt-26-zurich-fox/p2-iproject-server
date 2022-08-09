const User = require('../controllers/user')
const router = require('express').Router()

//User
router.post('/register', User.register)
router.post('/login', User.login)
router.post('/google-sign-in', User.googleLogin)

module.exports = router