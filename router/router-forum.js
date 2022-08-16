const forumRouter = require("express").Router();

forumRouter.get("/threads");
forumRouter.post("/threads");
forumRouter.get("/replies");
forumRouter.post("/replies");

module.exports = forumRouter;
