const router = require("express").Router();
const userRouter = require("./user");
const productRouter = require("./product");
const authentication = require("../middleware/authentication");
const serviceRouter = require("./service");

router.use("/user", userRouter);
router.use(authentication);
router.use("/product", productRouter);
router.use("/service", serviceRouter);

module.exports = router;
