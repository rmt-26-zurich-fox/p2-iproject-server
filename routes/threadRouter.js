const router = require("express").Router();
const ThreadController = require("../controllers/threadController");
const authorization = require("../middlewares/authorization");
const { authentication, getProfile } = require("../middlewares/authentication");

router.post(
  "/create",
  authentication,
  getProfile,
  ThreadController.createThread
);

module.exports = router;
