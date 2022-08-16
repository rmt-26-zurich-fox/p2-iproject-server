const {Planning, Anime} = require("../models")
class Controller {

    static async comment (req, res, next){
        try {
            let UserId = +req.user.id
            let response = await Planning.findAll({include: Anime, where: {UserId}})

            res.status(200).json(
                response
            )
        } catch (error) {
            next(error)
        }
    }

    static async postComment (req, res, next){
        try {
            let AnimeId = +req.params.id
            let UserId = +req.user.id

            await Planning.create({AnimeId, UserId})

            res.status(201).json({
                msg: `Dont forget to watch your planning anime`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller