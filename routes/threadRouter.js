const router = require("express").Router();
const ThreadController = require("../controllers/threadController");
const CommentController = require("../controllers/commentController");
const ProfileController = require("../controllers/profileController");
const {
  authorization,
  threadAccessing,
  underAgeAuthorization,
  editCommentAuthorization,
  deleteCommentAuthorization,
  dislikeAThreadAuthorization,
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
  underAgeVerification,
  underAgeAuthorization,
  ThreadController.findOneThread
);
router.post(
  "/:threadId/comment",
  authentication,
  getProfile,
  underAgeAuthorization,
  CommentController.createComment
);
router.post(
  "/:threadId/like",
  authentication,
  getProfile,
  underAgeAuthorization,
  ProfileController.likeAThread
);
router.delete(
  "/:threadId/like/:likeId",
  authentication,
  getProfile,
  underAgeAuthorization,
  dislikeAThreadAuthorization,
  ProfileController.dislikeAThread
);
router.put(
  "/:threadId/comment/:commentId",
  authentication,
  getProfile,
  editCommentAuthorization,
  CommentController.editComment
);
router.delete(
  "/:threadId/comment/:commentId",
  authentication,
  getProfile,
  deleteCommentAuthorization,
  CommentController.deleteComment
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
