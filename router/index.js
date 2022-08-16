const router = require("express").Router();
const userRouter = require("./router-user");
const productRouter = require("./router-product");
const thirdApiRouter = require("./router-api");
const forumRouter = require("./router-forum");

router.use(userRouter);
router.use(productRouter);
router.use(thirdApiRouter);
router.use(forumRouter);

module.exports = router;
