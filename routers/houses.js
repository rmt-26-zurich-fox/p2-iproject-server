const express = require("express");
const router = express.Router();
const HouseController = require("../controllers/house");

router.get("/", HouseController.getAllHouses);
router.get("/categories", HouseController.getAllCategories);
router.get("/:houseId", HouseController.getHouseDetail);

module.exports = router;
