const router= require('express').Router();
const Controller= require('../controllers/userController');


router.post('/google-sign-in', Controller.googleLogin)
router.post('/login', Controller.login)
router.post('/register',Controller.register)


module.exports= router