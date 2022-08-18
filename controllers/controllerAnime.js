const {Anime} = require("../models")
const axios = require("axios")

class Controller {
    
    static async fetchAnime(req, res, next){
        try {
            let season = req.params.season
            let response = await Anime.findAll({where: {season: season}})
            res.status(200).json(
                response
            )
        } catch (error) {
            next(error)
        }
    }

    static async topAnime(req, res, next){
        try {
            let {data} = await axios.get(`https://api.jikan.moe/v3/top/anime/1/upcoming`)

            let response = data.top.splice(0, 5)

            res.status(200).json(
                response
            )
        } catch (error) {
            next(error)
        }
    }

    static async animeDetails(req, res, next){
        try {
            let id = +req.params.animeId
            let response = await Anime.findOne({where: {id}})

            res.status(200).json(
                response
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller