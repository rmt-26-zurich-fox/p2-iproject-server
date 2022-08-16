const { Post } = require("../models");
 
class PostController {

    static async getReviewData(req, res, next) {
        try {
            let review = await Post.findAll();
            review.map(el => { return el });
            res.status(200).json(review);
        } catch (error) {
            next(error);
        }
    }

    static async postReview(req, res, next) {
        try {
            const UserId = req.user.id;
            const { name, imageUrl, article, category} = req.body;
            const postArticle = await Post.create({
                UserId, CategoryId: category, name, imageUrl, article, status: "Active"
            });
            res.status(200).json({
                message: "Success create Post",
                data: postArticle
            });
        } catch (error) {
            next(error);
        }   
    }

    

}

module.exports = PostController;