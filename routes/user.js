const UserController = require('../controllers/UserController');

const router = require('express').Router();

router.post('/login');
router.post('/register', UserController.register);
router.post('/google-signin');

module.exports = router;
