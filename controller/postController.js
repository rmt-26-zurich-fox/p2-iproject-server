const {
    Post
} = require("../models");

class PostController {

    // Get Review Data
    static async getReviewData(req, res, next) {
        try {
            let review = await Post.findAll({
                where: {
                    status: "Active"
                },
                order: [["createdAt", "desc"]]
            });
            review.map(el => {
                return el
            });
            res.status(200).json(review);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    // Post Review
    static async postReview(req, res, next) {
        try {
            const UserId = req.user.id;
            const {
                name,
                imageUrl,
                article,
                category
            } = req.body;
            const postArticle = await Post.create({
                UserId,
                CategoryId: category,
                name,
                imageUrl,
                article,
                status: "Active"
            });
            res.status(200).json({
                message: "Success create Post",
                data: postArticle
            });
        } catch (error) {
            next(error);
        }
    }

    // Edit Post
    static async editReview(req, res, next) {
        try {
            const id = req.params.id;
            const UserId = req.user.id;
            const {
                name,
                imageUrl,
                article,
                category,
                status
            } = req.body;
            const updatePost = await Post.update({
                name,
                imageUrl,
                article,
                category,
                status
            }, {
                where: {
                    id
                }
            });
            res.status(200).json({
                message: "Success update data"
            });
        } catch (error) {
            next(error);
        }
    }


}

module.exports = PostController;