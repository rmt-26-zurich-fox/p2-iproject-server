const express = require("express");
const authentication = require("../middlewares/authentication");
const router = express.Router();
const clothRouter = require("./cloth");
const userRouter = require("./user");
// const historyRouter = require("./history");
// const customerRouter = require("./customer");

router.use("/user", userRouter);
// router.use("/pub", customerRouter);
router.use(authentication);
router.use("/cloth", clothRouter);
// router.use("/history", historyRouter);

module.exports = router;
