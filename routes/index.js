const UserRouter = require("../routes/userRouter");
const ProfileRouter = require("../routes/profileRouter");
const errorHandler = require("../middlewares/errorHandler");
const { authentication } = require("../middlewares/authentication");
const router = require("express").Router();

router.use("/users", UserRouter);
router.use("/profiles", authentication, ProfileRouter);

router.use(errorHandler);
module.exports = router;
