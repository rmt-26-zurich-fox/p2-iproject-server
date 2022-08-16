const { Post } = require("../models");
 
class PostController {

    static async postArticle(req, res, next) {
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