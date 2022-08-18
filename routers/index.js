const express = require("express");
const authentication = require("../middlewares/authentication");
const router = express.Router();
const clothRouter = require("./cloth");
const userRouter = require("./user");

router.use("/user", userRouter);
router.use(authentication);
router.use("/cloth", clothRouter);

module.exports = router;
