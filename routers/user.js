const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.createUsers)
router.post('/login', UserController)

module.exports = router