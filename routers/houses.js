const express = require('express');
const router = express.Router();
const HouseController = require('../controllers/house')

router.get('/', HouseController.getHouseData)
router.get('/:houseId', HouseController.getHouseDetail)

module.exports = router