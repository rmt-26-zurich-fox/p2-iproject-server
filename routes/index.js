const router = require("express").Router();
const userRoutes = require("./user");
const thirdApiRoutes = require("./apis");

router.use(userRoutes);

router.use(thirdApiRoutes);

module.exports = router;