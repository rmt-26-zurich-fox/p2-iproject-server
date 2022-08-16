const { Post, Comment } = require("../models");
async function authorizationComment(req, res, next) {
    try {
        const { id, commentId } = req.params;
        const findPost = await Post.findByPk(id);
        if (!findPost) {
            throw { name: "PostNotFound" };
        }
        const findComment = await Comment.findByPk(commentId);
        if (!findComment) {
            throw { name: "CommentNotFound" };
        }
        if (findComment.User.id !== req.user.id) {
            throw { name: "Forbidden" };
        }
        next();
    } catch (error) {
        next(error);
    }
}
module.exports = authorizationComment;