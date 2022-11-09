const ProfileController = require('../controllers/profileController');
const router = require('express').Router();

router.get('/current', ProfileController.getProfile) //User dari access_token / req.user.id

router.put('/edit', ProfileController.editProfile) //User dari access_token / req.user.id

module.exports = router;