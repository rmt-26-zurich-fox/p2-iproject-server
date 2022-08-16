const router = require("express").Router();
const ThreadController = require("../controllers/threadController");
const {
  authorization,
  threadAccessing,
} = require("../middlewares/authorization");
const { authentication, getProfile } = require("../middlewares/authentication");

router.post(
  "/create",
  authentication,
  getProfile,
  ThreadController.createThread
);
router.put(
  "/edit/:threadId",
  authentication,
  getProfile,
  threadAccessing,
  ThreadController.editThread
);
router.delete(
  "/delete/:threadId",
  authentication,
  getProfile,
  threadAccessing,
  ThreadController.deleteThread
);

module.exports = router;
