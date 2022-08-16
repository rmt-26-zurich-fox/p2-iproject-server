const router = require("express").Router();
const userRouter = require("./user");
const categoryRouter = require("./category");
const postRouter = require("./post");
const apiRouter = require("./api");

router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/posts", postRouter);
router.use("/api", apiRouter);

module.exports = router;