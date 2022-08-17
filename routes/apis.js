const router = require("express").Router();
const ApiController = require("../controllers/APIController");

router.get("/football", ApiController.rapidApiFootball);

module.exports = router;