const router = require("express").Router();
const ApiController = require("../controller/apiController");

router.get("/", ApiController.getSongs);

module.exports = router;