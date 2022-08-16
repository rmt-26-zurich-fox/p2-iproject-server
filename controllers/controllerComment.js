const {Comment, User} = require("../models")

class Controller {

    static async comments(req, res, next){
        try {
            let AnimeId = +req.params.id
            let response = await Comment.findAll({
                include: User,
                where: {AnimeId}
            })

            res.status(200).json(
                response
            )
        } catch (error) {
            next(error)
        }
    }

    static async postComment(req, res, next){
        try {
            let AnimeId = +req.params.id
            let UserId = +req.user.id
            let {thread, gif} = req.body
            
            let response = await Comment.create({AnimeId, UserId, thread: thread, gif})

            res.status(201).json({
                msg: `Hooraaay... your comment has been added`
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = Controller