const express = require('express');
const router = express.Router();
const users = require('./users')
const houses = require('./houses');

router.use('/', users)
router.use('/houses', houses)

module.exports = router;
