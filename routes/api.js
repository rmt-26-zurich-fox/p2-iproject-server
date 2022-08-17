const router = require("express").Router();
const ApiController = require("../controller/apiController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/", ApiController.getSongs);

module.exports = router;