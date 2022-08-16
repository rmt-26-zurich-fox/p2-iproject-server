const router = require("express").Router();
const ThreadController = require("../controllers/threadController");
const {
  authorization,
  threadAccessing,
  underAgeAuthorization,
} = require("../middlewares/authorization");
const {
  authentication,
  getProfile,
  underAgeVerification,
} = require("../middlewares/authentication");

router.get(
  "/",
  authentication,
  getProfile,
  underAgeVerification,
  ThreadController.getThreadList
);
router.get(
  "/user/:profileId",
  authentication,
  getProfile,
  authorization,
  ThreadController.findThreadByProfileId
);
router.get(
  "/:threadId",
  authentication,
  getProfile,
  underAgeAuthorization,
  ThreadController.findOneThread
);

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
