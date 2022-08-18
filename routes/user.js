const { register, login, googleLogin } = require('../controllers/user')
const router = require('express').Router()

//User
router.post('/register', register)
router.post('/login', login)
router.post('/google-sign-in', googleLogin)

module.exports = router