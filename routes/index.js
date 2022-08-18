const router = require("express").Router();
const userRouter = require("./userRouter");
const artRouter = require("./artRouter");

const { verifyToken } = require("../helpers/jwt");
const authentication = require("../middlewares/authentication")

router.use("/users", userRouter)
router.use(authentication)
router.use("/art", artRouter)


module.exports = router;