const { Post, Like } = require("../models");

async function authorizationLike(req, res, next) {
    try {
        const { id } = req.params;
        const findPost = await Post.findByPk(id);
        if (!findPost) {
            throw { name: "postNotFound" };
        }
        const findLike = await Like.findOne({
            where: {
                PostId: id,
                Userid: req.user.id
            }
        });
        if (!findLike) {
            throw { name: "youDontLikeThisPostYet" };
        }
        if (findLike.Userid !== req.user.id) {
            throw { name: "Forbidden" };
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = authorizationLike;