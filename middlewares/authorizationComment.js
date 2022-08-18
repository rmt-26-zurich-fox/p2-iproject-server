const { Post, Comment } = require("../models");
async function authorizationComment(req, res, next) {
    try {
        const { id, commentId } = req.params;
        console.log(id, commentId);
        const findPost = await Post.findByPk(id);
        if (!findPost) {
            throw { name: "PostNotFound" };
        }
        const findComment = await Comment.findByPk(commentId);
        if (!findComment) {
            throw { name: "CommentNotFound" };
        }
        if (findComment.UserId == req.user.id || findPost.UserId == req.user.id) {
            next();
        } else {
            throw { name: "Forbidden" };
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}
module.exports = authorizationComment;