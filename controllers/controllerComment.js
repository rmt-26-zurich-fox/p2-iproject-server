const { Comment, User } = require("../models")
const Anime_Images = require('anime-images-api')
const API = new Anime_Images()

class Controller {

    static async comments(req, res, next) {
        try {
            let page = req.query.page
            let limit = 5
            let reg = new RegExp('^[0-9]*$');
            if (reg.test(page) == false || page <= 0) throw ({name: `notFound`})
            let AnimeId = +req.params.id
            let response = await Comment.findAndCountAll({
                include: User,
                order: [["createdAt", "DESC"]],
                where: { AnimeId },
                limit: limit,
                offset:(page - 1) * limit
            })
            const { count: totalItems, rows} = response
            res.status(200).json({
                totalItems, rows,
                currentPage: +page,
                totalPages: Math.ceil(totalItems / limit)
            })
        } catch (error) {
            next(error)
        }
    }

    static async postComment(req, res, next) {
        try {
            let AnimeId = +req.params.id
            let UserId = +req.user.id
            let { thread, gif } = req.body

            let response = await Comment.create({ AnimeId, UserId, thread: thread, gif:"https://c.tenor.com/aF0ipAtOk9cAAAAM/spy-x-family-anya.gif" })

            res.status(201).json({
                msg: `Hooraaay... your comment has been added`
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = Controller