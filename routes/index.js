const express = require('express');
const router = express.Router();
const users = require('./users')
const houses = require('./houses');
const errorHandler = require('../middlewares/errorHandling');

router.use('/', users)
router.use('/houses', houses)
router.use(errorHandler)

module.exports = router;
