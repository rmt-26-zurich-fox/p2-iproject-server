const express = require("express");
const router = express.Router();
const HouseController = require("../controllers/house");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer ({ storage });
const imageUpload = require('../middlewares/imageUploadHandler')

router.get("/", HouseController.getAllHouses);
router.post("/", upload.single('imageUrl', 1), imageUpload, HouseController.addHouse);
router.get("/categories", HouseController.getAllCategories);
router.get("/:houseId", HouseController.getHouseDetail);

module.exports = router;
