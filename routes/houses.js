const express = require("express");
const router = express.Router();
const HouseController = require("../controllers/house");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer ({ storage });
const imageUpload = require('../middlewares/imageUploadHandler')

const authentication = require('../middlewares/authentication');

router.get("/", HouseController.getAllHouses);
router.get("/categories", HouseController.getAllCategories);
router.get("/facilities", HouseController.getAllFacilities);
router.get("/details/:houseId", HouseController.getHouseDetail);
router.use(authentication)
router.post("/", upload.single('imageUrl'), imageUpload, HouseController.addHouse);
router.post("/midtrans", HouseController.midtransHandle)


module.exports = router;
