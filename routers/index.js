const express = require('express');
const router = express.Router();
const users = require('./users')
const houses = require('./houses');
const authentication = require('../middlewares/authentication');

router.use('/', users)
router.use(authentication)
router.use('/houses', houses)

module.exports = router;
