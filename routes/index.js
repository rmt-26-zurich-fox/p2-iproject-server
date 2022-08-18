const router = require("express").Router();
const errorHandler = require("../middlewares/errorHandler");

router.use(errorHandler);

module.exports = router;
