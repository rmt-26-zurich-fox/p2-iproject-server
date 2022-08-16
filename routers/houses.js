const express = require('express');
const router = express.Router();
const HouseController = require('../controllers/house')

router.get('/', HouseController.getHouseData)

module.exports = router