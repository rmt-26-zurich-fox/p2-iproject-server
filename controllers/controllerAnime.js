const {Anime} = require("../models")
const axios = require("axios")

class Controller {
    
    static async fetchWinter(req, res, next){
        try {
            let response = await Anime.findAll({where: {season: "Winter"}})
            res.status(200).json(
                response
            )
        } catch (error) {
            next(error)
        }
    }

    static async fetchSpring(req, res, next){
        try {
            let response = await Anime.findAll({where: {season: "Spring"}})
            res.status(200).json(
                response
            )
        } catch (error) {
            next(error)
        }
    }

    static async fetchSummer(req, res, next){
        try {
            let response = await Anime.findAll({where: {season: "Summer"}})
            res.status(200).json(
                response
            )
        } catch (error) {
            next(error)
        }
    }

    static async fetchFall(req, res, next){
        try {
            let response = await Anime.findAll({where: {season: "Fall"}})
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
}

module.exports = Controller