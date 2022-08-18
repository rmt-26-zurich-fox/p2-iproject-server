const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user')

router.post("/login", UserController.login)
router.post("/register", UserController.register)
router.post("/login-google", UserController.loginGoogle)

module.exports = router