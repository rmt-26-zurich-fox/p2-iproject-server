const router= require('express').Router();
const Controller= require('../controllers/userController');
const {oAuth}=require('../middlewares/oAuth');


router.post('/register',Controller.register)
router.post('/login', Controller.login)
router.post('/google-sign-in', oAuth)


module.exports= router