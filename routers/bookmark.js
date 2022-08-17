const router = require("express").Router();
const Controller = require("../controllers/bookmark");

router.post("/", Controller.addBookmark);

module.exports = router;
