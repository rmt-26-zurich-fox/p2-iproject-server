const router = require("express").Router();
const userRouter = require("./user");
const categoryRouter = require("./category");
const postRouter = require("./post");

router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/posts", postRouter);

module.exports = router;