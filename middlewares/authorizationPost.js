const { Post } = require("../models");

async function authorizationPost(req, res, next) {
    try {
        const { id } = req.params;
        const findPost = await Post.findByPk(id);
        if (!findPost) {
            throw { name: "PostNotFound" };
        }
        if (findPost.UserId !== req.user.id) {
            throw { name: "Forbidden" };
        }
        next();
    } catch (error) {
        next(error);
    }
}
module.exports = authorizationPost;