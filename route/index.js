const router = require('express').Router();
const UserController = require('../controllers/UserController');
const WeatherController = require('../controllers/WeatherController');
const authentication = require('../middleware/authentication');


router.post('/register', UserController.postRegister)
router.post('/login', UserController.postLogin)
router.post('/google-login', UserController.loginGoogle)
// router.post('/facebook-login', UserController)

router.use(authentication)

router.post('/bookmarks', WeatherController.postBookmark)
router.get('/bookmarks', WeatherController.getBookmark)
router.delete('/bookmarks/:id', WeatherController.deleteBookmarks)

module.exports = router