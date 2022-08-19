const router = require("express").Router();
const userRouter = require("./user");
const productRouter = require("./product");
const authentication = require("../middleware/authentication");
const serviceRouter = require("./service");
const requestRouter = require("./request");
const errorHandler = require("../middleware/errorHandler");
const PaymentController = require("../controllers/paymentController");

router.use("/user", userRouter);
router.use(authentication);
router.use("/product", productRouter);
router.use("/service", serviceRouter);
router.use("/request", requestRouter);
router.use(errorHandler);

module.exports = router;
