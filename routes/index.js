const router = require("express").Router();
const Controller = require("../controllers/controller");
const errorHandler = require("../middlewares/errorHandler");

router.get("/questions", Controller.getQuestion);
router.use(errorHandler);

module.exports = router;
