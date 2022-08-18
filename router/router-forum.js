const forumRouter = require("express").Router();
const ForumController = require("../controllers/forum-controller");
const authentication = require("../middleware/authentication");

forumRouter.get("/threads", ForumController.getThreadTitle);
forumRouter.get("/threads/:threadId", ForumController.getThreadTitleById);
forumRouter.post("/threads", authentication, ForumController.createThread);
forumRouter.get("/replies/:threadId", ForumController.getReply);
forumRouter.post("/replies", authentication, ForumController.createReply);

module.exports = forumRouter;
