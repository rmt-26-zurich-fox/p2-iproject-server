const UserRouter = require("../routes/userRouter");
const ProfileRouter = require("../routes/profileRouter");
const ThreadRouter = require("../routes/threadRouter");
const TeamRouter = require("../routes/teamRouter");
const CommentRouter = require("../routes/commentRouter");
const errorHandler = require("../middlewares/errorHandler");
const { authentication } = require("../middlewares/authentication");
const router = require("express").Router();

router.use("/users", UserRouter);
router.use("/teams", authentication, TeamRouter);
router.use("/profiles", authentication, ProfileRouter);
router.use("/threads", ThreadRouter);
router.use("/comments", CommentRouter);
router.get("/socket-chat", (req, res) => {
  res.status(200).json({ message: "ok!" });
});

router.use(errorHandler);
module.exports = router;
