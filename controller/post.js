const { Post, User, Like, Comment } = require("../models");
class PostController {
    static async readAllPost(req, res, next) {
        try {
            const post = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ["id", "email"]
                    }
                ],
                order: [
                    ['id', 'DESC']
                ]
            });
            res.status(200).json(post);
        } catch (error) {
            next(error);
        }
    }
    static async readOtherProfil(req, res, next) {
        try {
            const { id } = req.params;
            const findUser = await User.findByPk(id, {
                attributes: { exclude: ['password', "createdAt", "updatedAt"] },
            });
            const post = await Post.findAll({
                where: {
                    UserId: id
                },
                order: [["id", "DESC"]]
            });
            res.status(200).json({
                user: findUser,
                post: post
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async readPostById(req, res, next) {
        try {
            const { id } = req.params;
            const post = await Post.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes: ["id", "email"]
                    },
                    {
                        model: Like,
                    },
                    {
                        model: Comment,
                    }
                ],
            });
            res.status(200).json({
                post
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async addPost(req, res, next) {
        try {
            const { content, imgUrl } = req.body;
            const createPost = await Post.create({
                content,
                imgUrl,
                UserId: req.user.id
            });
            res.status(201).json({
                message: "succes add post"
            });
        } catch (error) {
            next(error);
        }
    }
    static async deletePost(req, res, next) {
        try {
            const { id } = req.params;
            const deletePost = await Post.destroy({
                where: {
                    id: id
                }
            });
            res.status(200).json({
                message: "success deleting post"
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async addComment(req, res, next) {
        try {
            const { id } = req.params;
            const { comment } = req.body;
            const findPost = await Post.findByPk(id);
            if (!findPost) {
                throw { name: "PostNotFound" };
            }
            const createComment = await Comment.create({
                comment,
                PostId: id,
                UserId: req.user.id
            });
            res.status(201).json({
                message: "succes add comment"
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async likePost(req, res, next) {
        try {
            const { id } = req.params;
            const findPost = await Post.findByPk(id);
            if (!findPost) {
                throw { name: "PostNotFound" };
            }
            const findLike = await Like.findOne({
                where: {
                    PostId: id,
                    UserId: req.user.id
                }
            });
            if (findLike) {
                throw { name: "alreadLike" };
            }
            const createLike = await Like.create({
                PostId: id,
                UserId: req.user.id
            });
            res.status(201).json({
                message: "succes like this post"
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async unlikePost(req, res, next) {
        try {
            const { id } = req.params;
            const findPost = await Post.findByPk(id);
            if (!findPost) {
                throw { name: "postNotFound" };
            }
            const findLike = await Like.findOne({
                where: {
                    PostId: id,
                    UserId: req.user.id
                }
            });
            if (!findLike) {
                throw { name: "youDontLikeThisPostYet" };
            }
            const unlikePost = await Like.destroy({
                where: {
                    PostId: id,
                    UserId: req.user.id
                }
            });
            res.status(200).json({
                message: "success unlike this post"
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    static async deleteComment(req, res, next) {
        try {
            const { id, commentId } = req.params;
            console.log(id, commentId);
            const findPost = await Post.findByPk(id);
            if (!findPost) {
                throw { name: "postNotFound" };
            }
            const findComment = await Comment.findByPk(commentId);
            if (!findComment) {
                throw { name: "CommentNotFound" };
            }
            const deleteComment = await Comment.destroy({
                where: {
                    id: commentId
                }
            });
            res.status(200).json({
                message: "success delete comment"
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = PostController;