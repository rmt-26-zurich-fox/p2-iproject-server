const router = require("express").Router();
const CommentController = require("../controllers/commentController");
const { authorization } = require("../middlewares/authorization");

module.exports = router;
