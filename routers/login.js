const UserController = require('../controllers/userController');
const router = require('express').Router();

router.post('/login', UserController.login);

router.post('/login-google', UserController.loginGoogle);

module.exports = router;