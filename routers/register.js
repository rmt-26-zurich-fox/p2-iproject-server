const UserController = require('../controllers/userController');
const router = require('express').Router();

router.post('/admin', UserController.adminRegister);
router.post('/customer', UserController.customerRegister);

module.exports = router;